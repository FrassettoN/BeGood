# Django
from django.db import models

# Files
from actions.models import SDG as SDG_model
from myaccount.models import User


class Course(models.Model):
    number = models.IntegerField(null=False, default=0)
    title = models.CharField(max_length=25, null=False, blank=False, unique=True)
    caption = models.CharField(max_length=150, null=False, blank=False)
    description = models.TextField()
    SDG = models.ForeignKey(SDG_model, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Topic(models.Model):
    title = models.CharField(max_length=25, null=False, blank=False, unique=True)
    description = models.TextField()
    caption = models.CharField(max_length=150, null=False, blank=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    number = models.IntegerField(null=False, default=0)

    def __str__(self):
        return f"{self.course} - {self.title}"


class Lesson(models.Model):
    RESOURCE_TYPES = [
        ("video", "video"),
        ("article", "article"),
        # General Link
        ("link", "link"),
    ]

    title = models.CharField(max_length=25, null=False, blank=False, unique=True)
    description = models.TextField(null=True, blank=True)
    resource_type = models.CharField(
        max_length=7, null=False, blank=False, choices=RESOURCE_TYPES
    )
    link = models.CharField(max_length=150, null=True, blank=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    number = models.IntegerField(null=False, default=0)

    def __str__(self):
        return f"{self.title} - {self.topic}"


class UserCourse(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    course = models.ForeignKey(to=Course, on_delete=models.CASCADE)
    topic = models.IntegerField(default=1)
    lesson = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user} - {self.course} - {self.lesson}"
