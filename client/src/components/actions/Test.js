import React, { useRef, useState } from 'react';

const Test = () => {
  const [flip, setFlip] = useState(false);
  const front = useRef();
  const back = useRef();
  const toggleFlip = () => {
    setFlip(!flip);
  };

  return (
    <article className={`test ${flip ? 'flip' : ''}`} onClick={toggleFlip}>
      <div className='test__front' ref={front}>
        <p>Front</p>
      </div>
      <div className='test__back' ref={back}>
        <p>Back</p>
      </div>
    </article>
  );
};

export default Test;
