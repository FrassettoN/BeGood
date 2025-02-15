import React from 'react';

const NavDurations = ({ visible, setVisible, type }) => {
  const durations = ['day', 'week', 'month'];

  const durationsTextOngoing = {
    day: 'today',
    week: 'this week',
    month: 'this month',
  };

  const durationsTextNew = {
    day: 'day',
    week: 'week',
    month: 'month',
  };

  const durationsTextAutomated = {
    day: 'done today',
    week: 'done this week',
    month: 'done this month',
  };

  const handlePrev = () => {
    const currentIndex = durations.indexOf(visible);
    const prevIndex = (currentIndex - 1 + durations.length) % durations.length;
    setVisible(durations[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = durations.indexOf(visible);
    const nextIndex = (currentIndex + 1) % durations.length;
    setVisible(durations[nextIndex]);
  };

  return (
    <div className='navDurations'>
      <button onClick={handlePrev}>&lt;</button>
      {type === 'ongoing' && <h2>{durationsTextOngoing[visible]}</h2>}
      {type === 'new' && <h2>{durationsTextNew[visible]}</h2>}
      {type === 'automated' && <h2>{durationsTextAutomated[visible]}</h2>}
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default NavDurations;
