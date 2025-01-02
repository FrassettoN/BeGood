import React from 'react';
import { FaShare } from 'react-icons/fa';

const InviteFriends = () => {
  const shareUrl = 'https://begood.tips';
  const message = 'Check out this amazing web app!';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BeGood',
          text: message,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className='inviteFriends'>
      <button onClick={handleShare}>
        <p>
          <span>Share</span> this project with your <span>friends</span>! <br />
          <FaShare />
        </p>
      </button>
    </div>
  );
};

export default InviteFriends;
