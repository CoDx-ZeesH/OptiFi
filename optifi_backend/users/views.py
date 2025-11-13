from .serializers import UserProfileSerializer
from .models import CustomUser
from rest_framework import generics, permissions
from rest_framework import status, generics, permissions
import logging
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer, UserProfileSerializer
from rest_framework import serializers
import requests
import base64
import json
User = get_user_model()

# Try to import firebase-admin verification helper
try:
    from firebase_admin import auth as firebase_auth
    import optifi_backend.firebase_admin_init  # ensures initialization
    FIREBASE_ADMIN_AVAILABLE = True
except Exception:
    firebase_auth = None
    FIREBASE_ADMIN_AVAILABLE = False


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        headers = self.get_success_headers(serializer.data)
        return Response({'tokens': tokens, 'user': UserSerializer(user).data}, status=status.HTTP_201_CREATED, headers=headers)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)

        if not user:
            # try authenticating by username if email fails
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(
                    request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        if user:
            tokens = get_tokens_for_user(user)
            return Response({'tokens': tokens, 'user': UserSerializer(user).data})
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user


class GoogleLoginView(generics.GenericAPIView):
    """Accepts a Firebase/Google ID token from the client, verifies it with
    Google's tokeninfo endpoint, then creates or returns a local user and
    issues JWT tokens for the frontend to use.
    """
    # Provide a minimal serializer so the browsable API and renderer can
    # instantiate a serializer for GET (renders an HTML form). The view
    # only implements POST, but DRF's browsable renderer calls
    # `get_serializer()` during rendering which requires a serializer.
    class TokenSerializer(serializers.Serializer):
        idToken = serializers.CharField(required=False, allow_blank=True)
        id_token = serializers.CharField(required=False, allow_blank=True)
        token = serializers.CharField(required=False, allow_blank=True)
        access_token = serializers.CharField(required=False, allow_blank=True)

    serializer_class = TokenSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        # Accept several common token field names for robustness
        id_token = (
            request.data.get('idToken')
            or request.data.get('id_token')
            or request.data.get('token')
            or request.data.get('access_token')
        )
        if not id_token:
            return Response({'detail': 'No ID token provided'}, status=status.HTTP_400_BAD_REQUEST)

        token_info = None
        # Prefer server-side verification using firebase-admin when available
        if FIREBASE_ADMIN_AVAILABLE:
            try:
                decoded = firebase_auth.verify_id_token(id_token)
                token_info = decoded
            except Exception as e:
                # Log the error but continue to the HTTP tokeninfo fallback; sometimes
                # firebase-admin may not be configured in the dev environment.
                logging.warning('firebase-admin verify_id_token failed: %s', e)

        if token_info is None:
            # Fallback to Google's tokeninfo endpoint
            try:
                resp = requests.get(
                    f'https://oauth2.googleapis.com/tokeninfo?id_token={id_token}', timeout=5)
            except Exception as e:
                logging.exception('Exception while calling tokeninfo: %s', e)
                return Response({'detail': f'Error verifying token with tokeninfo: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if resp.status_code != 200:
                # log response for debugging
                try:
                    logging.warning('tokeninfo failed: %s', resp.text)
                except Exception:
                    logging.warning(
                        'tokeninfo failed and response text could not be read')
                # forward Google's error message when available for easier debugging
                try:
                    err_json = resp.json()
                    detail = err_json.get('error_description') or err_json.get(
                        'error') or err_json
                except Exception:
                    detail = resp.text or 'Invalid ID token (google tokeninfo)'
                return Response({'detail': f'Invalid ID token (google tokeninfo) - {detail}'}, status=status.HTTP_401_UNAUTHORIZED)

            try:
                token_info = resp.json()
            except Exception as e:
                logging.exception('Failed to parse tokeninfo JSON: %s', e)
                return Response({'detail': 'Failed to parse token verification response'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        email = token_info.get('email')
        email_verified = token_info.get('email_verified') in [
            'true', True, 'True']
        name = token_info.get('name')

        if not email or not email_verified:
            return Response({'detail': 'Email not verified by provider'}, status=status.HTTP_400_BAD_REQUEST)

        # Find or create user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            username = email.split('@')[0]
            # Ensure username uniqueness
            base_username = username
            i = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{i}"
                i += 1

            user = User.objects.create(
                username=username,
                email=email,
                first_name=name.split(' ')[0] if name else '',
                last_name=' '.join(name.split(' ')[1:]) if name and len(
                    name.split(' ')) > 1 else ''
            )
            # mark unusable password since auth is via Google
            user.set_unusable_password()
            user.save()

        tokens = get_tokens_for_user(user)
        return Response({'tokens': tokens, 'user': UserSerializer(user).data})


class DebugDecodeTokenView(generics.GenericAPIView):
    """Temporary debug endpoint: accepts { idToken } and returns the
    decoded JWT payload without verification. Use this to inspect which
    kind of token the frontend is sending (ID token vs access token) and
    to check aud/iss claims.

    IMPORTANT: This endpoint should be removed before production.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        id_token = request.data.get('idToken') or request.data.get('id_token')
        if not id_token:
            return Response({'detail': 'No idToken provided'}, status=status.HTTP_400_BAD_REQUEST)

        parts = id_token.split('.')
        if len(parts) != 3:
            return Response({'detail': 'Token does not appear to be a JWT (expected 3 parts)'}, status=status.HTTP_400_BAD_REQUEST)

        payload_b64 = parts[1]
        # Add padding for base64url if necessary
        padding = '=' * (-len(payload_b64) % 4)
        try:
            payload_bytes = base64.urlsafe_b64decode(payload_b64 + padding)
            payload = json.loads(payload_bytes.decode('utf-8'))
        except Exception as e:
            return Response({'detail': f'Failed to decode token payload: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        # Return only the payload to help debugging (do not return the full token)
        return Response({'payload': payload})
