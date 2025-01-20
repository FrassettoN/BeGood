import React from 'react';
import { useSelector } from 'react-redux';

import Title from '../../components/Title';
import CreateActionForm from '../../layout/Actions/CreateActionForm';
import Action from '../../components/actions/Action';
import Protected from '../../components/Protected';

const CreateAction = () => {
  const { action, loading, error } = useSelector((state) => state.createAction);

  return (
    <>
      <Title title='New Actions - BeGood' />
      <Protected />
      <main className='createAction'>
        <h1 className='appPageTitle'>Create Your Action</h1>
        {error &&
          error.map((err, index) => (
            <h2 key={index} className='appError'>
              {err}
            </h2>
          ))}

        {loading ? (
          <div className='spinner' />
        ) : !action || Object.keys(action).length === 0 ? (
          <CreateActionForm />
        ) : (
          <div className='actions'>
            <Action type='new' action={action} />
          </div>
        )}
      </main>
    </>
  );
};

export default CreateAction;
