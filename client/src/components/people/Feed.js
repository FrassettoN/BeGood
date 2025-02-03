import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../redux/actions/peopleActions';
import FeedPost from './FeedPost';
import InviteFriends from './InviteFriends';
import { getSavedActions } from '../../redux/actions/actionActions';

const Feed = () => {
  const dispatch = useDispatch();
  const {
    content,
    loading,
    error: feedError,
  } = useSelector((state) => state.feed);
  const { error: savedError } = useSelector((state) => state.savedActions);

  useEffect(() => {
    dispatch(getFeed());
    dispatch(getSavedActions());
  }, [dispatch]);

  const renderFeed = (content) => {
    return content?.length === 0 ? (
      <InviteFriends />
    ) : (
      content?.map((post) => <FeedPost key={post.datetime} post={post} />)
    );
  };

  return (
    <section className='feed'>
      {feedError && <h2 className='appError'>{feedError}</h2>}
      {savedError && <h2 className='appError'>{savedError}</h2>}
      {loading && <div className='spinner'></div>}
      {renderFeed(content)}
    </section>
  );
};

export default Feed;
