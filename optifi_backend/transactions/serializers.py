from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            "id",
            "user",
            "date",
            "description",
            "amount",
            "type",
            "category",
            "source",
            "created_at",
        ]
        read_only_fields = ("user", "created_at")
