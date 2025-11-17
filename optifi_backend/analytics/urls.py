from django.urls import path
from .views import monthly_summary_api

urlpatterns = [ 
path("monthly-summary/", monthly_summary_api),
]