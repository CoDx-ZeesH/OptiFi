from django.urls import path, include
from .views import RegisterView, LoginView, UserProfileView, GoogleLoginView, DebugDecodeTokenView,dashboard_summary
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('debug-decode-token/', DebugDecodeTokenView.as_view(),
         name='debug-decode-token'),
    path('api/', include('transactions.urls')),
    path("dashboard/", dashboard_summary, name="dashboard-summary"),
]
