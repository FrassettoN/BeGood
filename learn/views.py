from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

# Files
from .models import *
from .serializers import *


# Create your views here.
@api_view(["GET"])
def get_courses(request):
    courses = Course.objects.all()
    serialized = CourseSerializer(courses, many=True)
    return Response(serialized.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_course(request, course_id):
    try:
        course = Course.objects.get(id=course_id)
        serialized = CourseSerializer(course, many=False)
        course_topics = course.topic_set.all()
        topics = TopicSerializer(course_topics, many=True)

        lessons = []
        for topic in course_topics:
            topic_lessons = topic.lesson_set.all()
            topic_lessons = topic_lessons.order_by("number")
            serialized_lessons = LessonSerializer(topic_lessons, many=True)
            lessons.append(serialized_lessons.data)

        user_course = (
            UserCourse.objects.filter(user=request.user, course=course).first() or None
        )
        if not user_course:
            user_course = UserCourse.objects.create(user=request.user, course=course)
        progress = UserCourseSerializer(user_course)
        data = {
            "info": serialized.data,
            "topics": topics.data,
            "lessons": lessons,
            "progress": progress.data,
        }
        return Response(data)

    except Exception as e:
        print(e)
        data = {"detail": f"Somenthing went wrong while getting course information"}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_progress(request, course_id):
    if request.method == "PUT":
        try:
            topic = int(request.data["topic"])
            lesson = int(request.data["lesson"])
            course = Course.objects.get(id=course_id)
            user_course = UserCourse.objects.get(user=request.user, course=course.id)

            user_course.topic = topic
            user_course.lesson = lesson
            user_course.save()

            serialized = UserCourseSerializer(user_course, many=False)

            return Response(serialized.data, status=status.HTTP_200_OK)

        except:
            data = {"detail": "Somenthing went wrong while saving your progress"}
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
