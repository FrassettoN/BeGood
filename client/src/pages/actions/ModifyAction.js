import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../components/Title';
import ActionForm from '../../layout/Actions/ActionForm';
import Protected from '../../components/Protected';
import { useLocation, useParams } from 'react-router-dom';
import {
  getActionDetails,
  resetActionDetails,
  resetFormAction,
} from '../../redux/actions/actionActions';
import { getUserDetails } from '../../redux/actions/userActions';
import Action from '../../components/actions/Action';

const ModifyAction = () => {
  const { id } = useParams();
  const { action, loading, error } = useSelector(
    (state) => state.actionDetails
  );
  const {
    action: modifiedAction,
    loading: modifiedLoading,
    error: modifiedError,
    message: modifiedMessage,
  } = useSelector((state) => state.formAction);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetFormAction());
    dispatch(resetActionDetails());
    dispatch(getActionDetails(id));
    dispatch(getUserDetails());
  }, [dispatch, id, location.key]);

  const actionDeleted = modifiedMessage === 'Action deleted!';
  const isActionValid =
    action && Object.keys(action).length > 0 && !actionDeleted;
  const isModifiedActionValid =
    modifiedAction && Object.keys(modifiedAction).length > 0;

  return (
    <>
      <Title title='Modify Action - BeGood' />
      <Protected />
      <main className='modifyAction'>
        {error && <h2 className='appError'>{error}</h2>}
        {modifiedError && <h2 className='appError'>{modifiedError}</h2>}
        {actionDeleted && <h2 className='appMessage'>{modifiedMessage}</h2>}

        {isActionValid && (
          <>
            <h1 className='appPageTitle'>
              {isModifiedActionValid ? modifiedAction.title : action.title}
              <span>modify</span>
            </h1>

            {loading || modifiedLoading ? (
              <div className='spinner' />
            ) : isActionValid && !isModifiedActionValid && !actionDeleted ? (
              <ActionForm type='modify' action={action} />
            ) : isModifiedActionValid ? (
              <div>
                <Action type='author' action={modifiedAction} />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default ModifyAction;
