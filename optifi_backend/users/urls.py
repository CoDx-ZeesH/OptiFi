from django.urls import path, include
from .views import RegisterView, LoginView, UserProfileUpdateView
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileUpdateView.as_view(), name='user-profile'),
    path('api/', include('transactions.urls')),
]
