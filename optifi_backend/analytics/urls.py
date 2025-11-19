from django.urls import path
from .views import (
    monthly_summary, weekly_summary,
    category_breakdown, ai_insights
)

urlpatterns = [
    path("monthly-summary/", monthly_summary),
    path("weekly-summary/", weekly_summary),
    path("category-breakdown/", category_breakdown),
    path("ai-insights/", ai_insights),
]
