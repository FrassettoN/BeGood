import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../components/Title';
import ActionForm from '../../layout/Actions/ActionForm';
import Action from '../../components/actions/Action';
import Protected from '../../components/Protected';
import { resetFormAction } from '../../redux/actions/actionActions';

const CreateAction = () => {
  const { action, loading, error } = useSelector((state) => state.formAction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFormAction());
  }, [dispatch]);

  return (
    <>
      <Title title='Create Action - BeGood' />
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
          <ActionForm type='new' />
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
