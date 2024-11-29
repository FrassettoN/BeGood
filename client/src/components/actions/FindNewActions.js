import React from 'react';
import { NavLink } from 'react-router-dom';

const FindNewActions = ({ duration }) => {
  const durationText = duration === 'day' ? 'today' : `this ${duration}`;
  return (
    <article className='findNew'>
      <h3>No more actions for {durationText}</h3>
      <NavLink to='/actions/new' className='btn green'>
        Find new actions
      </NavLink>
    </article>
  );
};

export default FindNewActions;
