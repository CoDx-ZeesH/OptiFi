# goals/views.py
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import SavingGoal
from .serializers import SavingGoalSerializer

# List + Create
class GoalListCreateView(generics.ListCreateAPIView):
    serializer_class = SavingGoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavingGoal.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Retrieve / Update / Delete
class GoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SavingGoalSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        return SavingGoal.objects.filter(user=self.request.user)


# Mark goal completed quickly (PATCH)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def mark_goal_completed(request, pk):
    try:
        goal = SavingGoal.objects.get(id=pk, user=request.user)
    except SavingGoal.DoesNotExist:
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    goal.completed = True
    # Optionally set saved_amount = target_amount on completion:
    # goal.saved_amount = goal.target_amount
    goal.save()
    return Response({"detail": "Goal marked as completed"})
