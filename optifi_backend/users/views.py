from rest_framework import generics, permissions, status, serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    LoginSerializer,
)
from .models import CustomUser
import logging
import requests
import base64
import json
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum
from datetime import date
from transactions.models import Transaction
from goals.models import SavingGoal

User = get_user_model()

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):
    user = request.user

    # 1️⃣ Income & Expense Summary
    total_income = Transaction.objects.filter(user=user, type="Income") \
                        .aggregate(total=Sum("amount"))["total"] or 0

    total_expense = Transaction.objects.filter(user=user, type="Expense") \
                        .aggregate(total=Sum("amount"))["total"] or 0

    # 2️⃣ Today’s Spent
    today_spent = Transaction.objects.filter(
        user=user, type="Expense", date=date.today()
    ).aggregate(total=Sum("amount"))["total"] or 0

    # 3️⃣ Category Breakdown (Optional)
    category_data = (
        Transaction.objects.filter(user=user, type="Expense")
        .values("category")
        .annotate(total=Sum("amount"))
        .order_by("-total")
    )

    # 4️⃣ Active Goals Overview
    goals = SavingGoal.objects.filter(user=user, completed=False)

    # Format the response
    response_data = {
        "balance": user.balance,
        "total_savings": user.total_savings,
        "monthly_income": user.monthly_income,
        "monthly_expenses": user.monthly_expenses,
        "monthly_savings": user.monthly_savings,

        "total_income": total_income,
        "total_expense": total_expense,
        "today_spent": today_spent,

        "category_summary": list(category_data),

        "active_goals": [
            {
                "title": g.title,
                "target_amount": float(g.target_amount),
                "saved_amount": float(g.saved_amount),
                "progress": round((g.saved_amount / g.target_amount) * 100, 2)
            }
            for g in goals
        ]
    }

    return Response(response_data)

# ---------------------------------
# JWT TOKEN GENERATION
# ---------------------------------
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


# ---------------------------------
# REGISTER VIEW
# ---------------------------------
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        tokens = get_tokens_for_user(user)
        return Response(
            {"tokens": tokens, "user": UserSerializer(user).data},
            status=status.HTTP_201_CREATED,
        )


# ---------------------------------
# LOGIN VIEW
# ---------------------------------
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Authenticate directly by username=email (common DRF pattern)
        user = authenticate(request, username=email, password=password)

        # If not found, fallback: find user by email -> authenticate by username
        if not user:
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(
                    request, username=user_obj.username, password=password
                )
            except User.DoesNotExist:
                return Response(
                    {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
                )

        if user:
            tokens = get_tokens_for_user(user)
            return Response(
                {"tokens": tokens, "user": UserSerializer(user).data},
                status=200,
            )

        return Response({"detail": "Invalid credentials"}, status=401)


# ---------------------------------
# PROFILE VIEW (GET + UPDATE)
# ---------------------------------
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer  # this now matches CustomUser model

    def get_object(self):
        return self.request.user

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Handles viewing and updating the logged-in user's full profile.
    This is your "User Model View" for the CustomUser model.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Always return the profile of the currently authenticated user
        return self.request.user

# ---------------------------------
# GOOGLE LOGIN VIEW
# ---------------------------------
class GoogleLoginView(generics.GenericAPIView):
    """Verifies Google/Firebase ID token and logs user in."""

    class TokenSerializer(serializers.Serializer):
        idToken = serializers.CharField(required=False, allow_blank=True)
        id_token = serializers.CharField(required=False, allow_blank=True)
        token = serializers.CharField(required=False, allow_blank=True)
        access_token = serializers.CharField(required=False, allow_blank=True)

    serializer_class = TokenSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        id_token = (
            request.data.get("idToken")
            or request.data.get("id_token")
            or request.data.get("token")
            or request.data.get("access_token")
        )

        if not id_token:
            return Response(
                {"detail": "No ID token provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Call Google tokeninfo endpoint for verification
        try:
            resp = requests.get(
                f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}",
                timeout=5,
            )
        except Exception as e:
            logging.error("Error contacting Google tokeninfo: %s", e)
            return Response({"detail": "Google token verification failed"}, status=500)

        if resp.status_code != 200:
            return Response(
                {"detail": "Invalid Google token"}, status=status.HTTP_401_UNAUTHORIZED
            )

        token_info = resp.json()

        # Extract important fields
        email = token_info.get("email")
        name = token_info.get("name")
        email_verified = token_info.get("email_verified") in ["true", True, "True"]

        if not email or not email_verified:
            return Response(
                {"detail": "Email not verified"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create or get user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            username = email.split("@")[0]
            base = username
            count = 1
            while User.objects.filter(username=username).exists():
                username = f"{base}{count}"
                count += 1

            user = User.objects.create(
                username=username,
                email=email,
                first_name=name.split(" ")[0] if name else "",
                last_name=" ".join(name.split(" ")[1:]) if name else "",
            )
            user.set_unusable_password()
            user.save()

        tokens = get_tokens_for_user(user)

        return Response({"tokens": tokens, "user": UserSerializer(user).data})


# ---------------------------------
# DEBUG TOKEN DECODER (DEV ONLY)
# ---------------------------------
class DebugDecodeTokenView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        id_token = request.data.get("idToken") or request.data.get("id_token")
        if not id_token:
            return Response({"detail": "No token provided"}, status=400)

        try:
            header, payload, signature = id_token.split(".")
        except:
            return Response({"detail": "Invalid token format"}, status=400)

        padding = "=" * (-len(payload) % 4)
        decoded = base64.urlsafe_b64decode(payload + padding)

        return Response({"payload": json.loads(decoded.decode())})

