# goals/urls.py
from django.urls import path
from .views import GoalListCreateView, GoalDetailView, mark_goal_completed

urlpatterns = [
    path("", GoalListCreateView.as_view(), name="goals-list-create"),            # GET list, POST create
    path("<int:pk>/", GoalDetailView.as_view(), name="goals-detail"),           # GET/PUT/PATCH/DELETE
    path("<int:pk>/complete/", mark_goal_completed, name="goals-mark-complete"),# POST mark complete
]
