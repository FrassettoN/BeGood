from django.urls import path, include
from . import newviews as views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
    TokenObtainPairView,
)


urlpatterns = [
    path("accounts/", include("allauth.urls")),  # For social account login
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path("users/", views.get_users, name="users"),
    path("users/profile/", views.get_user_profile, name="user_profile"),
    path("users/signup/", views.signup_user, name="sign_up"),
    path(
        "account/update/<str:interaction>/",
        views.update_account_view,
        name="update_account",
    ),
    # JWT
    path("users/login/", views.CustomLoginView.as_view(), name="token_obtain_pair"),
    path("users/login/refresh/", views.RefreshLogin.as_view(), name="token_refresh"),
    path("users/token/verify/", TokenVerifyView.as_view(), name="register"),
    path("users/logout/", views.CustomLogoutView.as_view(), name="logout"),
]
