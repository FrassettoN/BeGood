import React from 'react';

import imgGoal1 from '../images/sdg_goals/goal_1/color_icon.png';
import imgGoal2 from '../images/sdg_goals/goal_2/color_icon.png';
import imgGoal3 from '../images/sdg_goals/goal_3/color_icon.png';
import imgGoal4 from '../images/sdg_goals/goal_4/color_icon.png';
import imgGoal5 from '../images/sdg_goals/goal_5/color_icon.png';
import imgGoal6 from '../images/sdg_goals/goal_6/color_icon.png';
import imgGoal7 from '../images/sdg_goals/goal_7/color_icon.png';
import imgGoal8 from '../images/sdg_goals/goal_8/color_icon.png';
import imgGoal9 from '../images/sdg_goals/goal_9/color_icon.png';
import imgGoal10 from '../images/sdg_goals/goal_10/color_icon.png';
import imgGoal11 from '../images/sdg_goals/goal_11/color_icon.png';
import imgGoal12 from '../images/sdg_goals/goal_12/color_icon.png';
import imgGoal13 from '../images/sdg_goals/goal_13/color_icon.png';
import imgGoal14 from '../images/sdg_goals/goal_14/color_icon.png';
import imgGoal15 from '../images/sdg_goals/goal_15/color_icon.png';
import imgGoal16 from '../images/sdg_goals/goal_16/color_icon.png';
import imgGoal17 from '../images/sdg_goals/goal_17/color_icon.png';

const Chart = ({ stats }) => {
  const iconsPaths = [
    imgGoal1,
    imgGoal2,
    imgGoal3,
    imgGoal4,
    imgGoal5,
    imgGoal6,
    imgGoal7,
    imgGoal8,
    imgGoal9,
    imgGoal10,
    imgGoal11,
    imgGoal12,
    imgGoal13,
    imgGoal14,
    imgGoal15,
    imgGoal16,
    imgGoal17,
  ];

  let { actions, lessons } = stats;
  const totalActions = actions[0];

  const renderStatsCards = () => {
    // I'm using actions as arbitrary array to define sdgs
    return actions.map((action, sdg) => {
      if (sdg === 0) return null;
      return (
        <section className={`card sdg--${sdg}`} key={sdg}>
          <img src={iconsPaths[sdg - 1]} alt='' />

          <p className='card--actions'>
            <span>{action}</span>
            {action === 1 ? 'Action' : 'Actions'}
          </p>
          <p className='card--lessons'>
            <span>{lessons[sdg]}</span>
            {lessons[sdg] === 1 ? 'Lesson' : 'Lessons'}
          </p>
        </section>
      );
    });
  };

  const renderStatsBars = () => {
    return actions.map((value, sdg) => {
      if (sdg === 0) return null;
      return (
        <section className={`sdg--${sdg}`} key={sdg}>
          <p>{value !== 0 && value}</p>
          <div
            className='bar'
            style={{
              height: (value / (totalActions || 1)) * 100 * 3 + 1,
            }}></div>
        </section>
      );
    });
  };

  return (
    <div className='chart'>
      <div className='cards'>{renderStatsCards()}</div>
      <div className='bars-chart'>
        <div className='bars'>{renderStatsBars()}</div>
        <div className='icons'>
          {iconsPaths.map((path) => (
            <img src={path} alt='' key={path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
