import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const TopicCard = ({ topic }) => {
  const [imagePath, setImagePath] = useState();
  const { event, number, title, caption, SDG } = topic;

  useEffect(() => {
    const getImagePath = async () => {
      const { default: path } = await import(
        `../../images/event/event_${event}/topic_${number}.png`
      );
      setImagePath(() => path);
    };

    getImagePath();
  }, [event, number]);

  return (
    <Link
      to={`/events/${event}/${topic.number}/`}
      className={`topic-card-link`}>
      <div className={`topic sdg--${SDG}`}>
        <section className='image'>
          <img src={imagePath} alt='' />
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
