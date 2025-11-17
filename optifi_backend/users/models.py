from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Financial summary
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_savings = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    target_savings = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    monthly_income = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    monthly_expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    monthly_savings = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    today_spent = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    # Profile info
    profile_picture = models.ImageField(upload_to="profiles/", blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    nationality = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    member_since = models.DateField(auto_now_add=True)

    # Preferences & AI settings
    ai_nudges = models.BooleanField(default=True)
    email_reports = models.BooleanField(default=False)
    ocr_receipts_sync = models.BooleanField(default=True)
    insights_frequency = models.CharField(max_length=20, default="Weekly")  # Daily/Weekly/Monthly
    currency = models.CharField(max_length=10, default="INR")
    theme = models.CharField(max_length=10, default="dark")
    two_factor_auth = models.BooleanField(default=False)

class DailyExpense(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)  # food, travel, shopping, etc.
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.amount}"

class Budget(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    category = models.CharField(max_length=50)   # food, travel, shopping, etc.
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # budget limit
    period = models.CharField(max_length=20, default="monthly")   # daily/weekly/monthly/yearly

    start_date = models.DateField()
    end_date = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.category} ({self.period})"
