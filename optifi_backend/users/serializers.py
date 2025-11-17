from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CustomUser

User = get_user_model()


# --------------------------
# Registration Serializer
# --------------------------
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


# --------------------------
# Login Serializer
# --------------------------
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


# --------------------------
# User Profile Serializer
# --------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "balance",
            "total_savings",
            "target_savings",
            "monthly_income",
            "monthly_expenses",
            "monthly_savings",
            "today_spent",
            "profile_picture",
            "date_of_birth",
            "gender",
            "nationality",
            "address",
            "member_since",
            "ai_nudges",
            "email_reports",
            "ocr_receipts_sync",
            "insights_frequency",
            "currency",
            "theme",
            "two_factor_auth",
        ]
