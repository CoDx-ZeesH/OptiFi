from rest_framework import generics, permissions
from .models import Transaction
from .serializers import TransactionSerializer

# List all transactions for the logged-in user & create new transactions
class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Return only transactions belonging to the logged-in user
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    # Automatically set the logged-in user as the transaction owner
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
