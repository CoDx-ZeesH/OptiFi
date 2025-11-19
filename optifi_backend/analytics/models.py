from django.db import models
from users.models import CustomUser
class MonthlyAnalytics(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    month = models.CharField(max_length=7)  # "2025-07"
    total_income = models.IntegerField()
    total_expenses = models.IntegerField()
    ai_insight = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class WeeklyAnalytics(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    month_record = models.ForeignKey(MonthlyAnalytics, on_delete=models.CASCADE)
    week = models.CharField(max_length=3)  # W1/W2/W3/W4
    weekly_value = models.IntegerField()


class CategoryAnalytics(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    month_record = models.ForeignKey(MonthlyAnalytics, on_delete=models.CASCADE)
    category = models.CharField(max_length=50)
    amount = models.IntegerField()
