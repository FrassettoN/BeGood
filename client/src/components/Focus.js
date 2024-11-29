// Component to avoid problems with focus when using react-router-dom

import React, { useRef, useEffect } from 'react';

const Focus = ({ children }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  });
  return (
    <div ref={ref} tabIndex='-1' className='focus'>
      {children}
    </div>
  );
};

export default Focus;
