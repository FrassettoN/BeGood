import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAutomatedActions } from '../../redux/actions/actionActions';
import Action from '../../components/actions/Action';
import FindNewActions from '../../components/actions/FindNewActions';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';

const AutomatedActions = () => {
  const dispatch = useDispatch();
  const { actions, loading, error, message } = useSelector(
    (state) => state.automatedActions
  );

  useEffect(() => {
    dispatch(getAutomatedActions());
  }, [dispatch]);

  const renderActions = (actions, duration) => {
    const actionsToRender = actions
      .filter((action) => action.duration === duration)
      .map((action) => {
        return <Action type='automated' key={action.id} action={action} />;
      });

    return actionsToRender.length === 0 ? (
      <FindNewActions duration={duration} />
    ) : (
      actionsToRender
    );
  };

  return (
    <main className='actionsPage'>
      <Protected />
      {error && <h2 className='appError'>{error}</h2>}
      {message && <p className='appMessage'>{message}</p>}
      {loading && <div className='spinner'></div>}

      <h1 className='appPageTitle'>Automated Actions</h1>

      <NavActions />

      <div className='actions'>
        <h2>
          Done <span>today</span>:
        </h2>
        {actions && renderActions(actions, 'day')}
      </div>
      <div className='actions'>
        <h2>
          Done <span>this week</span>:
        </h2>
        {actions && renderActions(actions, 'week')}
      </div>
      <div className='actions'>
        <h2>
          Done <span>this month</span>:
        </h2>
        {actions && renderActions(actions, 'month')}
      </div>
    </main>
  );
};

export default AutomatedActions;
