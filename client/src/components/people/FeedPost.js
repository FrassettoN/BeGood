import React from 'react';
import Action from '../actions/Action';
import { Link } from 'react-router-dom';
import profileImgPath from '../../images/sdg_goals/sdg_wheel/white_small.png';
import { useSelector } from 'react-redux';

const FeedPost = ({ post }) => {
  const { actionId, message, error } = useSelector((state) => state.newActions);

  const renderMessage = (message) => {
    if (post.action.id === actionId) {
      return <p className='appMessage'>{message}</p>;
    }
  };

  return (
    <>
      <section className='feed__post'>
        {error && <h2 className='appError'>{error}</h2>}

        {message && renderMessage(message)}
        <h4>
          <Link to={`/people/${post.author}`}>
            <img className='profileImg' src={profileImgPath} alt='profile' />
            {post.author}
          </Link>
          suggests:
        </h4>
        <Action type='new' action={post.action} />
      </section>
      <hr />
    </>
  );
};

export default FeedPost;
