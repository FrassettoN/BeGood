import React, { useEffect } from 'react';
// import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../../components/learn/CourseCard';
import Protected from '../../components/Protected';
import { getCourses } from '../../redux/actions/learnActions';
import { getUserDetails } from '../../redux/actions/userActions';
import Focus from '../../components/Focus';

const Learn = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getCourses());
  }, [dispatch]);

  const renderCourses = (courses) => {
    return courses.map((course) => (
      <CourseCard course={course} key={course.id} />
    ));
  };

  return (
    <>
      {/* <Helmet>
        <title>Learn - BeGood</title>
      </Helmet> */}
      <main className='learnPage'>
        <Focus />
        <Protected />
        <h1 className='appPageTitle'>Learn</h1>
        <div className='welcomeBox'>
          <p>
            Hi <span className='username'>{user?.info?.username}</span> 👋
          </p>
          <p>What do you want to learn today?</p>
        </div>

        <div className='courses'>
          {error && <h2 className='appError'>{error}</h2>}
          {loading && <div className='spinner'></div>}
          <h2>Courses:</h2>

          <div className='cardsContainer'>
            {courses && renderCourses(courses)}
          </div>
        </div>
      </main>
    </>
  );
};

export default Learn;
