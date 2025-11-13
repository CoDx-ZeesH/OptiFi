from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'  # include all fields
        read_only_fields = ['id', 'user', 'created_at']  # these are auto-handled
