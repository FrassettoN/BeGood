import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAutomatedActions } from '../../redux/actions/actionActions';
import Action from '../../components/actions/Action';
import FindNewActions from '../../components/actions/FindNewActions';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';
import Title from '../../components/Title';
import NavDurations from '../../components/actions/NavDurations';
import { NavLink } from 'react-router-dom';
import { MdAutoMode } from 'react-icons/md';

const AutomatedActions = () => {
  const dispatch = useDispatch();
  const { actions, loading, error, message } = useSelector(
    (state) => state.automatedActions
  );
  const [visible, setVisible] = React.useState('day');

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
    <>
      <Title title='Automated Actions - BeGood' />
      <main className='actionsPage'>
        <Protected />
        {error && <h2 className='appError'>{error}</h2>}
        {message && <p className='appMessage'>{message}</p>}
        {loading && <div className='spinner'></div>}

        <h1 className='appPageTitle'>Automated Actions</h1>

        <NavActions />

        <NavDurations
          visible={visible}
          setVisible={setVisible}
          type='automated'
        />

        <nav className='navActions large_screen'>
          <NavLink to='/actions/automated'>
            <MdAutoMode className='icon' />
          </NavLink>
        </nav>

        {visible === 'day' && (
          <div className='actions'>
            {actions && renderActions(actions, 'day')}
          </div>
        )}

        {visible === 'week' && (
          <div className='actions'>
            {actions && renderActions(actions, 'week')}
          </div>
        )}

        {visible === 'month' && (
          <div className='actions'>
            {actions && renderActions(actions, 'month')}
          </div>
        )}
      </main>
    </>
  );
};

export default AutomatedActions;
