from django.db import models
from users.models import CustomUser

class MonthlySummary(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    month = models.DateField()  # store as first day of month: 2025-01-01

    income = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    savings = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.month.strftime('%b %Y')}"
