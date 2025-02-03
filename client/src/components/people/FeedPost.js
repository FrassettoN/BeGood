import React from 'react';
import Action from '../actions/Action';
import { Link } from 'react-router-dom';
import profileImgPath from '../../images/sdg_goals/sdg_wheel/white_small.png';
import { useSelector } from 'react-redux';

const FeedPost = ({ post }) => {
  const {
    actionId,
    message: newActionMessage,
    error: newActionError,
  } = useSelector((state) => state.newActions);
  const { actions: savedActions, error: savedError } = useSelector(
    (state) => state.savedActions
  );

  const isSaved = savedActions.some((action) => action.id === post.action.id);

  const renderNewActionMessage = (message) => {
    if (post.action.id === actionId) {
      return <p className='appMessage'>{message}</p>;
    }
  };

  return (
    <>
      <section className='feed__post'>
        {newActionError && <h2 className='appError'>{newActionError}</h2>}
        {savedError && <h2 className='appError'>{savedError}</h2>}

        {newActionMessage && renderNewActionMessage(newActionMessage)}
        <h4>
          <Link to={`/people/${post.author}`}>
            <img className='profileImg' src={profileImgPath} alt='profile' />
            {post.author}
          </Link>
          recommends:
        </h4>
        <Action type={isSaved ? 'none' : 'new'} action={post.action} />
      </section>
      <hr />
    </>
  );
};

export default FeedPost;
