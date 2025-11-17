from django.urls import path
from .views import (
    create_transaction,
    list_transactions,
    update_transaction,
    delete_transaction,
    monthly_transactions,
    category_summary,
    today_spent,
)

urlpatterns = [
    path("add/", create_transaction),
    path("all/", list_transactions),
    path("update/<int:pk>/", update_transaction),
    path("delete/<int:pk>/", delete_transaction),
    path("monthly/", monthly_transactions),
    path("categories/", category_summary),
    path("today/", today_spent),
]
