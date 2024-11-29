import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCourseProgress } from '../redux/actions/learnActions';

const Lesson = ({ lesson, course, topic, completed }) => {
  const dispatch = useDispatch();

  const [complete, setComplete] = useState(completed);

  const updateProgress = (lesson) => {
    dispatch(updateCourseProgress(course, topic, lesson));
  };

  const handleCompleteCheckbox = () => {
    if (complete) {
      updateProgress(lesson.number - 1);
    } else {
      updateProgress(lesson.number);
    }
    setComplete(!complete);
  };

  return (
    <div className='lesson'>
      {lesson.resource_type === 'video' && (
        <>
          <div className='video'>
            <iframe title={lesson.title} src={lesson.link} />
          </div>

          <section className='form__section completeCheckboxSection switchSection'>
            <label
              htmlFor='completeCheckbox'
              className='switch'
              id='completeCheckboxSwitch'>
              <input
                type='checkbox'
                checked={completed}
                onChange={handleCompleteCheckbox}
                id='completeCheckbox'
              />
              <span className='slider round'></span>
            </label>
            <label
              htmlFor='completeCheckbox'
              id='completeCheckboxLabel'
              className='switchTextLabel'>
              Completed
            </label>
          </section>
        </>
      )}
      {lesson.resource_type === 'article' && (
        <div>
          <h3>{lesson.title}</h3>
          <p>{lesson.description}</p>
          <a
            target='_blank'
            rel='noreferrer'
            className='visit btn'
            href={`${lesson.link}`}
            onClick={() => updateProgress(lesson.number)}>
            Visit
          </a>
        </div>
      )}
    </div>
  );
};

export default Lesson;
