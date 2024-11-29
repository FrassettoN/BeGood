from django.urls import path, include
from . import views


urlpatterns = [
    # Password Reset
    path(
        "auth/password_reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
    # Contact Email
    path("emails/contact/", views.ContactView.as_view(), name="contact"),
]
