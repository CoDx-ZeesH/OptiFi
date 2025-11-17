from django.db import models
from users.models import CustomUser

class SavingGoal(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    saved_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    start_date = models.DateField()
    end_date = models.DateField()

    completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

