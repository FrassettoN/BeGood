# Python
import os

# Django
from django.shortcuts import render
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

# Rest Framework
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


# django_rest_passwordreset
from django_rest_passwordreset.signals import reset_password_token_created

# Files
from .models import ContactEmail
from backend.settings import EMAIL_TOKEN, EMAIL_HOST, DEBUG


# Send an email with the link to the page to reset the password.
@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """

    reset_url = (
        "http://localhost:3000" if DEBUG else "https://begood.tips"
    ) + f"/#/auth/password_reset?token={reset_password_token.key}"

    # send an e-mail to the user
    context = {
        "current_user": reset_password_token.user,
        "username": reset_password_token.user.username,
        "email": reset_password_token.user.email,
        "reset_password_url": reset_url,
    }

    # render email text
    email_html_message = render_to_string("email/user_reset_password.html", context)
    email_plaintext_message = render_to_string("email/user_reset_password.txt", context)

    msg = EmailMultiAlternatives(
        # title:
        f"Password Reset for BeGood",
        # message:
        email_plaintext_message,
        # from:
        "test@test.test" if DEBUG else "noreply@begood.tips",
        # to:
        [reset_password_token.user.email],
    )
    msg.attach_alternative(email_html_message, "text/html")

    msg.send()


class ContactView(APIView):
    def post(self, request, format=None):
        data = request.data
        response = Response()
        email = data.get("email", None)
        subject = data.get("subject", None)
        message = data.get("message", None)

        try:
            contact_email = ContactEmail.objects.create(
                sender=email, subject=subject, message=message
            )
            contact_email.save()
            return Response(
                {"message": "Thanks! We will get in touch with you soon"},
                status=status.HTTP_202_ACCEPTED,
            )
        except:
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
