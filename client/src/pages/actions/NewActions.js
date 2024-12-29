import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../../components/actions/Action';
import { getNewActions } from '../../redux/actions/actionActions';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';
import Title from '../../components/Title';

const NewActions = () => {
  const dispatch = useDispatch();
  const { actions, loading, error } = useSelector((state) => state.newActions);

  useEffect(() => {
    dispatch(getNewActions());
  }, [dispatch]);

  const renderActions = (actions, duration) => {
    return (
      <>
        <h2>
          To do in a <span>{duration}</span>:
        </h2>
        {actions
          ?.filter((action) => action.duration === duration)
          ?.map((action) => {
            return <Action type='new' key={action.id} action={action} />;
          })}
      </>
    );
  };

  return (
    <>
      <Title title='New Actions - BeGood' />
      <main className='actionsPage'>
        <Protected />
        {error && <div className='appError'>{error}</div>}
        {loading && <div className='spinner'></div>}

        <h1 className='appPageTitle'>New Actions</h1>

        <NavActions />

        <div className='actions'>
          {actions && renderActions(actions, 'day')}
        </div>

        <div className='actions'>
          {actions && renderActions(actions, 'week')}
        </div>

        <div className='actions'>
          {actions && renderActions(actions, 'month')}
        </div>
      </main>
    </>
  );
};

export default NewActions;
