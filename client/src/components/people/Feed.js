import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../redux/actions/peopleActions';
import FeedPost from './FeedPost';

const Feed = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const renderFeed = (content) => {
    return content?.length === 0 ? (
      // <InviteFriends/>
      <div>Feed</div>
    ) : (
      content?.map((post) => <FeedPost key={post.datetime} post={post} />)
    );
  };

  return (
    <section className='feed'>
      {error && <h2 className='appError'>{error}</h2>}
      {loading && <div className='spinner'></div>}
      {renderFeed(content)}
    </section>
  );
};

export default Feed;
