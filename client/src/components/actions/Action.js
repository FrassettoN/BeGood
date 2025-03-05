import React, { useState, useEffect, useRef } from 'react';
import NewActionButtons from './NewActionBtns';
import UserActionButtons from './UserActionBtns';
import AutomatedActionButtons from './AutoActionBtns';
import { Link } from 'react-router-dom';
import { TbInfoOctagon } from 'react-icons/tb';
import { GoPencil } from 'react-icons/go';

const Action = ({ action, className, type }) => {
  const [flip, setFlip] = useState(false);
  const front = useRef();
  const back = useRef();
  const types = type?.split(' ') || [];

  const [iconsPaths, setIconsPaths] = useState({});

  const getIconPaths = async (action) => {
    action?.SDGs?.forEach(async (SDG) => {
      const { default: path } = await import(
        `../../images/sdg_goals/goal_${SDG}/color_icon.png`
      );
      setIconsPaths((prevPaths) => ({ ...prevPaths, [SDG]: path }));
    });
  };

  useEffect(() => {
    getIconPaths(action);
  }, [action]);

  if (!action) return;

  const renderSDGsIcons = (SDGs) => {
    return SDGs.map((SDG) => {
      return (
        <img
          key={SDG}
          src={iconsPaths[SDG]}
          alt={`Goal ${SDG}`}
          className='action__sdg'
          onClick={(e) => e.stopPropagation()}
        />
      );
    });
  };

  const toggleFlip = () => {
    setFlip(!flip);
  };

  return (
    <article
      className={`action ${flip ? 'flip' : ''} ${className ? className : ''} `}
      onClick={toggleFlip}>
      <div className='action__front' ref={front}>
        <h3 className='action__title'>{action.title}</h3>
        <small className='action__level'>{action.level}</small>
        <p className='action__caption'>{action.caption}</p>
        <section className='action__bottom'>
          <div className='action__sdgs'>
            {action.SDGs && renderSDGsIcons(action.SDGs)}
          </div>
          {!types.includes('author') && action.description && (
            <Link
              className='action__info'
              onClick={(e) => e.stopPropagation()}
              to={`/actions/${action.id}`}>
              <TbInfoOctagon />
            </Link>
          )}
          {types.includes('author') && (
            <>
              <Link
                className='action__info'
                onClick={(e) => e.stopPropagation()}
                to={`/actions/modify/${action.id}`}>
                <GoPencil />
              </Link>
            </>
          )}
        </section>
      </div>
      <div className='action__back' ref={back}>
        <h3 className='action__back__title'>{action.title}</h3>
        {types.includes('user') && (
          <UserActionButtons id={action.id} setFlip={setFlip} />
        )}
        {types.includes('new') && (
          <NewActionButtons id={action.id} setFlip={setFlip} />
        )}
        {types.includes('automated') && (
          <AutomatedActionButtons id={action.id} setFlip={setFlip} />
        )}
      </div>
    </article>
  );
};

export default Action;
