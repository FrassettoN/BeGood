import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Material = ({ material }) => {
  const { event_id, topic_number } = useParams();
  const [imagePath, setImagePath] = useState();

  useEffect(() => {
    const getImagePath = async () => {
      const { default: path } = await import(
        `../../images/event/event_${event_id}/${material.link}`
      );
      setImagePath(() => path);
    };

    if (material?.resource_type === 'image') {
      getImagePath();
    }
  }, [event_id, topic_number, material]);

  return (
    <article className={`material ${material.resource_type}`}>
      {material.resource_type === 'video' && (
        <>
          <h3>{material.title}</h3>
          <iframe
            frameBorder='0'
            scrolling='no'
            allowFullScreen
            title={material.title}
            src={material.link}
          />
        </>
      )}

      {material.resource_type === 'article' && (
        <>
          <h3>{material.title}</h3>
          <p>{material.text}</p>
          <a
            target='_blank'
            rel='noreferrer'
            className='visit btn'
            href={`${material.link}`}>
            Visit
          </a>
        </>
      )}
      {material.resource_type === 'quote' && (
        <>
          <h3>{material.title}</h3>
          <em>{material.text}</em>
        </>
      )}

      {material.resource_type === 'paragraph' && (
        <>
          <h3>{material.title}</h3>
          <p>{material.text.replace(/\\n/g, '\n')}</p>
        </>
      )}

      {material.resource_type === 'image' && (
        <>
          <h3>{material.title}</h3>
          <img src={imagePath} alt='' />
          <p>{material.text.replace(/\\n/g, '\n')}</p>
        </>
      )}
    </article>
  );
};

export default Material;
