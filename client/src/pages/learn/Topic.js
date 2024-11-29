import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, useParams } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Lesson from '../../components/Lesson';
import Protected from '../../components/Protected';
import { getCourseDetails } from '../../redux/actions/learnActions';

const Topic = () => {
  const { course_id, topic_number } = useParams();
  const dispatch = useDispatch();

  const {
    course: { topics, lessons: course_lessons, info, progress },
    loading,
    error,
  } = useSelector((state) => state.courseDetails);

  const { progress: lesson_progress } = useSelector(
    (state) => state.courseProgress
  );

  const topic = topics?.find((topic) => topic.number === +topic_number);
  const lessons = course_lessons && course_lessons[+topic_number - 1];

  useEffect(() => {
    dispatch(getCourseDetails(course_id));
  }, [dispatch, course_id, lesson_progress]);

  return (
    <>
      {/* <Helmet>
        <title>{`${topic?.title || 'Topic'} - BeGood`}</title>
      </Helmet> */}
      <main className={`topicPage sdg--${info?.SDG}`}>
        <Protected />
        {error && <div className='appError'>{error}</div>}
        {loading && <div className='spinner'></div>}
        {topic && lessons && (
          <>
            <h1 className='appPageTitle'>{topic.title}</h1>
            <p className='description'>{topic.description}</p>

            <div className='lessonContainer'>
              {/* Lessons Nav */}
              <nav>
                {lessons.map((lesson) => (
                  <Link
                    to={`/learn/courses/${course_id}/${topic_number}/${lesson.number}`}
                    key={lesson.number}
                    className={`${
                      progress.topic > +topic_number ||
                      (progress.topic === +topic_number &&
                        progress.lesson >= lesson.number)
                        ? 'active'
                        : progress.lesson + 1 !== lesson.number && 'disabled'
                    }`}>
                    <span>Lesson</span> {lesson.number}
                  </Link>
                ))}
              </nav>

              {/* Lesson */}
              <Routes className='resource'>
                {lessons.map((lesson) => {
                  return (
                    <Route
                      path={`/${lesson.number}/`}
                      key={lesson.number}
                      element={
                        <Lesson
                          lesson={lesson}
                          course={course_id}
                          topic={topic_number}
                          completed={
                            progress.topic > +topic_number ||
                            (progress.topic === +topic_number &&
                              progress.lesson >= lesson.number)
                          }
                          exact
                        />
                      }
                    />
                  );
                })}
              </Routes>
            </div>

            <div className='topic-footer'>
              {+topic_number !== 1 && (
                <Link
                  to={`/learn/courses/${course_id}/${topic_number - 1}/${
                    course_lessons[+topic_number - 2]?.length
                  }`}
                  className='btn'>
                  {`< Previus Topic`}
                </Link>
              )}
              <Link to={`/learn/courses/${course_id}/`} className='btn'>
                Return to course
              </Link>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Topic;
