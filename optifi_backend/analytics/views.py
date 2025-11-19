from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from transactions.models import Transaction
from datetime import datetime, timedelta
from django.db.models import Sum
import calendar


# -----------------------------------------------------------
# 1. MONTHLY SUMMARY (Already Exists)
# -----------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def monthly_summary(request):
    user = request.user

    current_year = datetime.now().year
    data = []

    for month in range(1, 13):
        month_expenses = Transaction.objects.filter(
            user=user,
            type="Expense",
            date__year=current_year,
            date__month=month
        ).aggregate(total=Sum("amount"))["total"] or 0

        month_income = Transaction.objects.filter(
            user=user,
            type="Income",
            date__year=current_year,
            date__month=month
        ).aggregate(total=Sum("amount"))["total"] or 0

        data.append({
            "month": calendar.month_abbr[month],
            "income": abs(float(month_income)),
            "expenses": abs(float(month_expenses)),
        })

    return Response(data)


# -----------------------------------------------------------
# 2. WEEKLY SPENDING SUMMARY
# -----------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def weekly_summary(request):
    user = request.user

    today = datetime.today()
    start_of_month = today.replace(day=1)

    # Prepare 4 weeks
    weekly_data = []
    week_labels = ["W1", "W2", "W3", "W4"]

    for i in range(4):
        week_start = start_of_month + timedelta(days=i * 7)
        week_end = week_start + timedelta(days=6)

        total_week_spend = Transaction.objects.filter(
            user=user,
            type="Expense",
            date__range=(week_start, week_end)
        ).aggregate(total=Sum("amount"))["total"] or 0

        weekly_data.append({
            "week": week_labels[i],
            "value": abs(float(total_week_spend)),
        })

    return Response(weekly_data)


# -----------------------------------------------------------
# 3. CATEGORY BREAKDOWN
# -----------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def category_breakdown(request):
    user = request.user

    month = datetime.now().month
    year = datetime.now().year

    transactions = Transaction.objects.filter(
        user=user,
        type="Expense",
        date__year=year,
        date__month=month
    )

    category_totals = {}

    for tx in transactions:
        category_totals[tx.category] = category_totals.get(tx.category, 0) + float(tx.amount)

    data = [{"name": k, "value": abs(v)} for k, v in category_totals.items()]
    return Response(data)


# -----------------------------------------------------------
# 4. OPTIBRAIN AI INSIGHTS
# -----------------------------------------------------------
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def ai_insights(request):
    user = request.user

    this_month = datetime.now().month
    year = datetime.now().year

    expenses = Transaction.objects.filter(
        user=user,
        type="Expense",
        date__month=this_month,
        date__year=year
    )

    # Defaults
    highlight = "You're doing well! No unusual spending detected."

    # Rules
    food_total = expenses.filter(category="Food").aggregate(Sum("amount"))["amount__sum"] or 0
    travel_total = expenses.filter(category="Travel").aggregate(Sum("amount"))["amount__sum"] or 0
    shop_total = expenses.filter(category="Shopping").aggregate(Sum("amount"))["amount__sum"] or 0

    if food_total > 5000:
        highlight = "🍽 You're overspending on Food this month."
    elif travel_total > 3000:
        highlight = "🚕 Travel expenses have increased this month."
    elif shop_total > 4000:
        highlight = "🛍 Shopping is unusually high this month."

    return Response({
        "highlight": highlight,
        "month": calendar.month_name[this_month]
    })
