from django.db import models
from users.models import CustomUser 

class Transaction(models.Model):
    EXPENSE = 'Expense'
    INCOME = 'Income'
    TRANSACTION_TYPE_CHOICES = [
        (EXPENSE, 'Expense'),
        (INCOME, 'Income')
    ]

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='transactions')
    date = models.DateField()
    description = models.TextField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    category = models.CharField(max_length=100, blank=True, null=True)
    source = models.CharField(max_length=50, blank=True, null=True)  # Manual, CSV, OCR
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.description} - {self.amount}"