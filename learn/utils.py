from .models import UserCourse


def learn_progress(user):
    """Create a list in which:
    - the first element represents the total number of lessons
    - other elements represent the number of lessons completed for each SDG.
    """

    total_lessons = 0
    sdgs_progress = [0 for num in range(0, 18)]

    user_courses = UserCourse.objects.filter(user=user).all()
    for user_course in user_courses:
        course = user_course.course
        topics = course.topic_set.all()
        lessons = user_course.lesson

        for topic in topics:
            if user_course.topic > topic.number:
                lessons += topic.lesson_set.count()

        sdgs_progress[course.SDG.number] += lessons
        total_lessons += lessons

    sdgs_progress[0] = total_lessons
    return sdgs_progress
