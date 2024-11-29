import React, { useState, useEffect, useRef } from 'react';
import NewActionButtons from './NewActionBtns';
import UserActionButtons from './UserActionBtns';
import AutomatedActionButtons from './AutoActionBtns';

const Action = ({ action, className, type }) => {
  const [flip, setFlip] = useState(false);
  const [iconsPaths, setIconsPaths] = useState({});

  const front = useRef();
  const back = useRef();

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
        <div className='action__sdgs'>
          {action.SDGs && renderSDGsIcons(action.SDGs)}
        </div>
      </div>
      <div className='action__back' ref={back}>
        <h3 className='action__back__title'>{action.title}</h3>
        {type === 'user' && (
          <UserActionButtons id={action.id} setFlip={setFlip} />
        )}
        {type === 'new' && (
          <NewActionButtons id={action.id} setFlip={setFlip} />
        )}
        {type === 'automated' && (
          <AutomatedActionButtons id={action.id} setFlip={setFlip} />
        )}
      </div>
    </article>
  );
};

export default Action;
