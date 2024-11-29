import React from 'react';
import { notAutomateAction } from '../../redux/actions/actionActions';
import { useDispatch } from 'react-redux';

const AutomatedActionButtons = ({ id, setFlip }) => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.stopPropagation();
    dispatch(notAutomateAction(id));
  };

  return (
    <button
      onClick={onClick}
      onFocus={() => setFlip(true)}
      className='action__button btn blue'>
      Remove auto
    </button>
  );
};

export default AutomatedActionButtons;
