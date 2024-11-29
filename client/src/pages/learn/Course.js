import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Protected from '../../components/Protected';
import TopicCard from '../../components/learn/TopicCard';
import { getCourseDetails } from '../../redux/actions/learnActions';

const Course = () => {
  const { course_id } = useParams();
  const dispatch = useDispatch();
  const { course, loading, error } = useSelector(
    (state) => state.courseDetails
  );

  useEffect(() => {
    dispatch(getCourseDetails(course_id));
  }, [dispatch, course_id]);

  return (
    <>
      {/* <Helmet>
        <title>{`${course?.title || 'Course'} - BeGood`}</title>
      </Helmet> */}
      <main className={`coursePage sdg--${course?.info?.SDG}`}>
        <Protected />
        {error && <div className='appError'>{error}</div>}
        {loading && <div className='spinner'></div>}
        {course?.info && (
          <>
            <h1 className='appPageTitle'>{course.info.title}</h1>
            <p className='description'>{course.info.description}</p>

            <h2>Topics:</h2>
            <div className={`cardsContainer sdg--${course?.info?.SDG}`}>
              {course.topics &&
                course.topics.map((topic) => (
                  <TopicCard
                    courseNumber={course.info.number}
                    topic={topic}
                    sdg={course.info.SDG}
                    key={topic.id}
                    lesson={
                      course.progress.topic > topic.number
                        ? course.lessons[topic.number - 1].length
                        : course.progress.topic === topic.number
                        ? course.progress.lesson
                        : '1'
                    }
                    status={`${
                      course.progress.topic >= topic.number ||
                      (course.progress.topic === topic.number - 1 &&
                        course.lessons[topic.number - 2].length ===
                          course.progress.lesson)
                        ? 'active'
                        : 'disabled'
                    }`}
                  />
                ))}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Course;
