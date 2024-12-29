# Django
from django.conf import settings

# Rest Framework
from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions

# JWT
from rest_framework_simplejwt.authentication import JWTAuthentication

# Files
from .utils import refresh_access


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        self.enforce_CSRF(request)
        data = None

        if header is None:
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT["REFRESH_COOKIE"])
            if raw_token:
                data = refresh_access(raw_token)
        else:
            raw_token = self.get_raw_token(header)
            data = {"access": raw_token}

        if data is None or raw_token is None:
            return None
        if isinstance(data["access"], bytes) and data["access"] == b"undefined":
            return None

        try:
            validated_token = self.get_validated_token(data.get("access"))
        except exceptions.AuthenticationFailed as e:
            raise exceptions.AuthenticationFailed(
                f"Session Expired. Try to reload the page!"
            )

        return self.get_user(validated_token), validated_token

    def enforce_CSRF(self, request):
        """
        Enforce CSRF validation
        """
        check = CSRFCheck(lambda request: None)
        # populates request.META['CSRF_COOKIE'], which is used in process_view()
        check.process_request(request)
        reason = check.process_view(request, None, (), {})
        if reason:
            # CSRF failed, bail with explicit error message
            raise exceptions.PermissionDenied(f"CSRF Failed: {reason}")
