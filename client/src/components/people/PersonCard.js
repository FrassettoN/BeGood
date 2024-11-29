import React from 'react';
import { Link } from 'react-router-dom';
import profileImgPath from '../../images/sdg_goals/sdg_wheel/white_small.png';

const PersonCard = ({ person }) => {
  return (
    <>
      <Link to={`/people/${person.username}`} className='personCard'>
        <img className='profileImg' src={profileImgPath} alt='' />
        <div className='text'>
          <h4>{person.username}</h4>

          <p>
            Level <span>{person.level}</span>
          </p>
        </div>
      </Link>
    </>
  );
};

export default PersonCard;
