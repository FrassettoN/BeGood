from django.urls import path
from . import views

# learn/courses/ # GET


urlpatterns = [
    path("learn/courses/", views.get_courses, name="courses"),
    path("learn/courses/<int:course_id>/", views.get_course, name="course"),
    path(
        "learn/courses/<int:course_id>/progress/",
        views.update_progress,
        name="update_progress",
    ),
]
