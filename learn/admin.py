from django.contrib import admin
from .models import Course, Topic, Lesson, UserCourse


# Register your models here.
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title",)
    list_filter = ("SDG",)


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "course",
    )
    list_filter = ("course",)


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("title", "resource_type")
    list_filter = (
        "title",
        "topic",
        "resource_type",
    )


@admin.register(UserCourse)
class UserCourseAdmin(admin.ModelAdmin):
    list_display = ("user", "course", "lesson")
    list_filter = (
        "user",
        "course",
    )
