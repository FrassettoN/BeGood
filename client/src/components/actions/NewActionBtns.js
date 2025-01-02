import React from 'react';
import { useDispatch } from 'react-redux';
import { saveAction } from '../../redux/actions/actionActions';

const NewActionButtons = ({ id, setFlip }) => {
  const dispatch = useDispatch();

  const onClick = (e) => {
    e.stopPropagation();
    dispatch(saveAction(id));
  };

  return (
    <button
      onClick={onClick}
      onFocus={() => setFlip(true)}
      className='action__button btn green save'>
      Save
    </button>
  );
};

export default NewActionButtons;
