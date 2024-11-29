from django.contrib import admin
from .models import ContactEmail


# Register your models here.
@admin.register(ContactEmail)
class ContactEmailAdmin(admin.ModelAdmin):
    list_display = (
        "sender",
        "subject",
    )
