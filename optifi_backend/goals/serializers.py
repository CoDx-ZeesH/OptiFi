# goals/serializers.py
from rest_framework import serializers
from .models import SavingGoal

class SavingGoalSerializer(serializers.ModelSerializer):
    progress = serializers.SerializerMethodField(read_only=True)
    days_left = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = SavingGoal
        fields = [
            "id",
            "user",
            "title",
            "target_amount",
            "saved_amount",
            "start_date",
            "end_date",
            "completed",
            "created_at",
            "progress",
            "days_left",
        ]
        read_only_fields = ("user", "created_at", "progress", "days_left")

    def get_progress(self, obj):
        try:
            if not obj.target_amount or float(obj.target_amount) == 0:
                return 0.0
            return round((float(obj.saved_amount or 0) / float(obj.target_amount)) * 100, 2)
        except Exception:
            return 0.0

    def get_days_left(self, obj):
        from datetime import date
        if obj.completed or not obj.end_date:
            return None
        today = date.today()
        delta = (obj.end_date - today).days
        return delta if delta >= 0 else 0

    def create(self, validated_data):
        # user is assigned in view, but keep safe here if passed
        return super().create(validated_data)
