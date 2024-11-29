import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const [iconPath, setIconPath] = useState();

  const getIconPath = async (course) => {
    const SDG = course.SDG;
    const { default: path } = await import(
      `../../images/sdg_goals/goal_${SDG}/white_icon.png`
    );
    setIconPath(path);
  };

  useEffect(() => {
    getIconPath(course);
  }, [course]);

  return (
    <Link to={`/learn/courses/${course.id}`}>
      <div className={`courseCard sdg--${course.SDG}`}>
        <div className='content'>
          <section className='image'>
            <img src={iconPath} alt='' />
          </section>
          <section className='text'>
            <h3>{course.title}</h3>
            <p>{course.caption}</p>
          </section>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
