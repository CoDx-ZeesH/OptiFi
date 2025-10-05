from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    is_premium = models.BooleanField(default=False)

    # New fields for profile completion
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    fixed_expenses = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    savings_goal = models.CharField(max_length=255, blank=True, null=True)
    target_savings = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    preferred_budget_alert_limit = models.IntegerField(default=80)
    currency = models.CharField(max_length=10, default="INR")
    def __str__(self):
        return self.username
