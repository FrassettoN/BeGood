import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  followPerson,
  unfollowPerson,
} from '../../redux/actions/peopleActions';

const FollowButtons = ({ username, isFollowing }) => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(isFollowing);

  const onClick = (e, type) => {
    e.stopPropagation();
    switch (type) {
      case 'follow':
        dispatch(followPerson(username));
        setFollowing(true);
        break;
      case 'unfollow':
        dispatch(unfollowPerson(username));
        setFollowing(false);
        break;
      default:
        return;
    }
  };

  return (
    <div>
      {following && (
        <button className='btn white' onClick={(e) => onClick(e, 'unfollow')}>
          Unfollow
        </button>
      )}
      {!following && (
        <button className='btn green' onClick={(e) => onClick(e, 'follow')}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButtons;
