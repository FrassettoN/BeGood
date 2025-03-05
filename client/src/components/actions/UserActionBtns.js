import React from 'react';
import { useDispatch } from 'react-redux';
import {
  completeAction,
  failedAction,
  automateAction,
  shareAction,
  removeAction,
} from '../../redux/actions/actionActions';
import { HiXCircle, HiCheckCircle } from 'react-icons/hi';
import { IoIosShareAlt } from 'react-icons/io';
import { MdAutoMode } from 'react-icons/md';

const UserActionButtons = ({ setFlip, id }) => {
  const dispatch = useDispatch();

  const onClick = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case 'remove':
        dispatch(removeAction(id));
        break;
      case 'complete':
        dispatch(completeAction(id));
        break;
      case 'failed':
        dispatch(failedAction(id));
        break;
      case 'automate':
        dispatch(automateAction(id));
        break;
      case 'share':
        dispatch(shareAction(id));
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div className='action__buttons' onClick={(e) => e.stopPropagation()}>
        <button
          className='action__button icon btn blue reversed no-hover'
          onClick={(e) => onClick(e, 'automate')}
          onFocus={() => setFlip(true)}>
          <MdAutoMode className='icon automate' />
        </button>
        <button
          className='action__button icon btn green reversed no-hover'
          onClick={(e) => onClick(e, 'complete')}
          onFocus={() => setFlip(true)}>
          <HiCheckCircle className='icon' />
        </button>
        <button
          className='action__button icon btn red reversed no-hover'
          onClick={(e) => onClick(e, 'failed')}
          onFocus={() => setFlip(true)}>
          <HiXCircle className='icon' />
        </button>
        <button
          className='action__button icon btn yellow reversed no-hover'
          onClick={(e) => onClick(e, 'share')}
          onFocus={() => setFlip(true)}>
          <IoIosShareAlt className='icon' />
        </button>
      </div>
      <button
        className='action__button action__remove'
        onClick={(e) => onClick(e, 'remove')}
        onFocus={() => setFlip(true)}
        onBlur={() => setFlip(false)}>
        Remove
      </button>
    </>
  );
};

export default UserActionButtons;
