import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../../components/actions/Action';
import FindNewActions from '../../components/actions/FindNewActions';
import { getOngoingActions } from '../../redux/actions/actionActions';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';
import Title from '../../components/Title';

const OngoingActions = () => {
  const dispatch = useDispatch();
  const { actions, loading, error, message } = useSelector(
    (state) => state.ongoingActions
  );

  useEffect(() => {
    dispatch(getOngoingActions());
  }, [dispatch]);

  const renderActions = (actions, duration) => {
    const actionsToRender = actions
      .filter((action) => action.duration === duration)
      .map((action) => {
        return <Action type='user' key={action.id} action={action} />;
      });

    return actionsToRender.length === 0 ? (
      <FindNewActions duration={duration} />
    ) : (
      actionsToRender
    );
  };

  return (
    <>
      <Title title='My Actions - BeGood' />
      <main className='actionsPage'>
        <Protected />
        {error && <h2 className='appError'>{error}</h2>}
        {message && <p className='appMessage'>{message}</p>}
        {loading && <div className='spinner'></div>}
        <h1 className='appPageTitle'>My Actions</h1>

        <NavActions />

        <div className='actions'>
          <h2>
            To do <span>today</span>:
          </h2>
          {actions && renderActions(actions, 'day')}
        </div>

        <div className='actions'>
          <h2>
            To do <span>this week</span>:
          </h2>
          {actions && renderActions(actions, 'week')}
        </div>

        <div className='actions'>
          <h2>
            To do <span>this month</span>:
          </h2>
          {actions && renderActions(actions, 'month')}
        </div>
      </main>
    </>
  );
};

export default OngoingActions;
