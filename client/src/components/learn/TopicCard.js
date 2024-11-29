import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ courseNumber, topic, sdg, status, lesson }) => {
  const [imagePath, setImagePath] = useState();
  const { course: courseId, number, title, caption } = topic;

  useEffect(() => {
    const getImagePath = async () => {
      const { default: path } = await import(
        `../../images/learn/course_${courseNumber}/topic_${number}.png`
      );
      setImagePath(path);
    };

    getImagePath();
  }, [courseNumber, number]);

  return (
    <Link
      to={`/learn/courses/${courseId}/${number}/${lesson > 0 ? lesson : 1}`}
      className={`topic-card-link ${status}`}>
      <div className={`topic sdg--${sdg}`}>
        <section className='image'>
          <img src={imagePath} alt={title}></img>
        </section>
        <section className='text'>
          <h3>{title}</h3>
          <p>{caption}</p>
        </section>
      </div>
    </Link>
  );
};

export default TopicCard;
