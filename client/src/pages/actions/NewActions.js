import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../../components/actions/Action';
import { getNewActions } from '../../redux/actions/actionActions';
import NavActions from '../../components/actions/NavActions';
import Protected from '../../components/Protected';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import NavDurations from '../../components/actions/NavDurations';

const NewActions = () => {
  const dispatch = useDispatch();
  const { actions, loading, error } = useSelector((state) => state.newActions);
  const [visible, setVisible] = React.useState('day');

  useEffect(() => {
    dispatch(getNewActions());
  }, [dispatch]);

  const renderActions = (actions, duration) => {
    return (
      <>
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

        <NavDurations visible={visible} setVisible={setVisible} type='new' />
        <section className='createAction'>
          <Link to='/actions/create' className='btn violet'>
            Create
          </Link>
        </section>

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

export default NewActions;
