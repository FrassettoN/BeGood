from django.db import models


class ContactEmail(models.Model):
    """Contact Email saved in database"""

    sender = models.EmailField(blank=False, null=False)
    subject = models.CharField(max_length=40, null=False, blank=False)
    message = models.TextField(null=False, blank=False)

    def __str__(self):
        return (
            f"From: {self.sender} -  Subject: {self.subject} - Message: {self.message}"
        )
