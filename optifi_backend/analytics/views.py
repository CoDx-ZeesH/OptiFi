from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import MonthlySummary

@api_view(["GET"])
@permission_classes([IsAuthenticated])

def monthly_summary_api(request):
    user = request.user

    monthly = MonthlySummary.objects.filter(user=user).order_by("month")

    data = [
        {
            "month": m.month.strftime("%b %Y"),
            "income": float(m.income),
            "expenses": float(m.expenses),
            "savings": float(m.savings),
        }
        for m in monthly
    ]

    return Response(data)
