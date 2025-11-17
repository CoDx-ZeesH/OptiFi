from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from .models import Transaction
from .serializers import TransactionSerializer
from datetime import date


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_transaction(request):
    serializer = TransactionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_transactions(request):
    transactions = Transaction.objects.filter(user=request.user).order_by("-date")
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_transaction(request, pk):
    try:
        transaction = Transaction.objects.get(id=pk, user=request.user)
    except Transaction.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    serializer = TransactionSerializer(transaction, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_transaction(request, pk):
    try:
        transaction = Transaction.objects.get(id=pk, user=request.user)
    except Transaction.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    transaction.delete()
    return Response({"message": "Transaction deleted successfully"})

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def monthly_transactions(request):
    month = request.query_params.get("month")  # format: YYYY-MM
    if not month:
        return Response({"error": "Month is required (YYYY-MM)"}, status=400)

    transactions = Transaction.objects.filter(
        user=request.user,
        date__startswith=month
    ).order_by("-date")

    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def category_summary(request):
    data = (
        Transaction.objects.filter(user=request.user)
        .values("category")
        .annotate(total=Sum("amount"))
        .order_by("-total")
    )
    return Response(data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def today_spent(request):
    total = (
        Transaction.objects.filter(
            user=request.user,
            type="Expense",
            date=date.today()
        ).aggregate(Sum("amount"))["amount__sum"] or 0
    )
    return Response({"today_spent": total})
