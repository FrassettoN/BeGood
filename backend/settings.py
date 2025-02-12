"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from datetime import timedelta
from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

SECRET_KEY = os.environ["SECRET_KEY"]
DEBUG = os.getcwd() == "/home/niccolo/Projects/BeGood/begood/backend"

# Security
SECURE_SSL_REDIRECT = not DEBUG
SECURE_HSTS_SECONDS = not DEBUG
SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
SECURE_HSTS_PRELOAD = not DEBUG

ALLOWED_HOSTS = [
    "localhost",
    "begood.tips",
    "www.begood.tips",
    "begood-n735g.ondigitalocean.app",
]

# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework.authtoken",
    "django_rest_passwordreset",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "corsheaders",
    "backend",
    "myaccount",
    "people",
    "actions",
    "emails",
    "learn",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://www.begood.tips",
    "https://begood.tips",
    "https://begood-n735g.ondigitalocean.app",
]

CSRF_HEADER_NAME = "CSRF_COOKIE"
CSRF_COOKIE_SAMESITE = "STRICT"
CSRF_COOKIE_SECURE = not DEBUG
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "https://begood.tips",
    "https://www.begood.tips",
    "https://begood-n735g.ondigitalocean.app",
]


REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "myaccount.authenticate.CustomJWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ),
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {"anon": "100/day", "user": "1000/day"},
}
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "AUTH_HEADER_TYPES": ("Bearer", "JWT"),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
    "REFRESH_COOKIE": "refresh_token",
    # A string like "example.com", or None for standard domain cookie.
    "REFRESH_COOKIE_DOMAIN": None,
    # Whether the auth cookies should be secure (https:// only).
    "REFRESH_COOKIE_SECURE": not DEBUG,
    # Http only cookie flag.It's not fetch by javascript.
    "REFRESH_COOKIE_HTTP_ONLY": True,
    "REFRESH_COOKIE_PATH": "/",  # The path of the auth cookie.
    # Whether to set the flag restricting cookie leaks on cross-site requests. This can be 'Lax', 'Strict', or None to disable the flag.
    "REFRESH_COOKIE_SAMESITE": "Strict",
}


REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "access_token",
    "JWT_REFRESH_COOKIE": "refresh_token",
    "JWT_AUTH_HTTPONLY": True,
}
AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

SITE_ID = 1

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "client/build"),
            os.path.join(BASE_DIR, "templates"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASES = {
    "default": {},
    "dev": {
        # "ENGINE": "django.db.backends.sqlite3",
        # "NAME": BASE_DIR / "db.sqlite3",
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "begood_db",
        "USER": "postgres",
        "PASSWORD": "password",
        "HOST": "localhost",
        "PORT": "5432",
    },
    "production": {
        "ENGINE": "" if DEBUG else "django.db.backends.postgresql_psycopg2",
        "URL": os.environ.get("DATABASE_URL") or "",
        "NAME": os.environ.get("DATABASE_NAME") or "",
        "USER": os.environ.get("DATABASE_USER") or "",
        "PASSWORD": os.environ.get("DATABASE_PASSWORD") or "",
        "HOST": os.environ.get("DATABASE_HOST") or "",
        "PORT": os.environ.get("DATABASE_PORT") or "",
    },
}


DATABASES["default"] = DATABASES["dev" if DEBUG else "production"]

# Change default account
AUTH_USER_MODEL = "myaccount.User"


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-uk"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"
MEDIA_URL = "/images/"

STATICFILES_DIRS = [BASE_DIR / "static", BASE_DIR / "client/build/static"]

MEDIA_ROOT = BASE_DIR / "static/images"
STATIC_ROOT = BASE_DIR / "frontend"

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Email Settings
EMAIL_HOST = "smtp.mailpace.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = not DEBUG
EMAIL_USE_SSL = False
EMAIL_HOST_USER = os.environ.get("EMAIL_TOKEN") or ""
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_TOKEN") or ""
EMAIL_TOKEN = os.environ.get("EMAIL_TOKEN") or ""
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
if DEBUG:
    EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
    EMAIL_FILE_PATH = f"{os.getcwd()}/tmp/app-messages"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    # 'disable_existing_loggers': False,
    "filters": {
        "require_debug_false": {
            "()": "django.utils.log.RequireDebugFalse",
        },
        "require_debug_true": {
            "()": "django.utils.log.RequireDebugTrue",
        },
    },
    "formatters": {
        "django.server": {
            "()": "django.utils.log.ServerFormatter",
            "format": "[{server_time}] {message}",
            "style": "{",
        }
    },
    "handlers": {
        "console": {
            "level": "INFO",
            #'filters': ['require_debug_true'],
            "class": "logging.StreamHandler",
        },
        "django.server": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "django.server",
        },
        "mail_admins": {
            "level": "ERROR",
            #'filters': ['require_debug_false'],
            "class": "django.utils.log.AdminEmailHandler",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "mail_admins"],
            "level": "INFO",
        },
        "django.server": {
            "handlers": ["django.server"],
            "level": "INFO",
            "propagate": False,
        },
    },
}
