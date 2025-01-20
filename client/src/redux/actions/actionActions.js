import {
  ACTION_DETAILS_REQUEST,
  ACTION_DETAILS_SUCCESS,
  ACTION_DETAILS_FAIL,
  ONGOING_ACTIONS_REQUEST,
  ONGOING_ACTIONS_SUCCESS,
  ONGOING_ACTIONS_FAIL,
  SAVE_ACTION_FAIL,
  SAVE_ACTION_REQUEST,
  SAVE_ACTION_SUCCESS,
  DELETE_ACTION_FAIL,
  DELETE_ACTION_REQUEST,
  DELETE_ACTION_SUCCESS,
  NEW_ACTIONS_REQUEST,
  NEW_ACTIONS_SUCCESS,
  NEW_ACTIONS_FAIL,
  COMPLETE_ACTION_REQUEST,
  COMPLETE_ACTION_FAIL,
  COMPLETE_ACTION_SUCCESS,
  FAILED_ACTION_REQUEST,
  FAILED_ACTION_SUCCESS,
  FAILED_ACTION_FAIL,
  AUTOMATE_ACTION_REQUEST,
  AUTOMATE_ACTION_SUCCESS,
  AUTOMATE_ACTION_FAIL,
  AUTOMATED_ACTIONS_REQUEST,
  AUTOMATED_ACTIONS_SUCCESS,
  AUTOMATED_ACTIONS_FAIL,
  NOT_AUTOMATE_ACTION_FAIL,
  NOT_AUTOMATE_ACTION_SUCCESS,
  NOT_AUTOMATE_ACTION_REQUEST,
  SHARE_ACTION_REQUEST,
  SHARE_ACTION_SUCCESS,
  SHARE_ACTION_FAIL,
  SAVED_ACTIONS_FAIL,
  SAVED_ACTIONS_SUCCESS,
  SAVED_ACTIONS_REQUEST,
  CREATE_ACTION_REQUEST,
  CREATE_ACTION_SUCCESS,
  CREATE_ACTION_FAIL,
} from '../../constants/actionsConstants';
import backend from '../../api/backend';
import { createConfig, formatError } from './utils';

export const getActionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_DETAILS_REQUEST });
    const { data } = await backend.get(`/actions/${id}`);
    dispatch({ type: ACTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTION_DETAILS_FAIL,
      payload: formatError(error),
    });
  }
};

export const getSavedActions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVED_ACTIONS_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/actions/ongoing/', config);
    dispatch({ type: SAVED_ACTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SAVED_ACTIONS_FAIL,
      payload: formatError(error),
    });
  }
};

export const getOngoingActions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ONGOING_ACTIONS_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/actions/ongoing/', config);
    dispatch({ type: ONGOING_ACTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ONGOING_ACTIONS_FAIL,
      payload: formatError(error),
    });
  }
};

export const getAutomatedActions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTOMATED_ACTIONS_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/actions/automated/', config);
    dispatch({ type: AUTOMATED_ACTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTOMATED_ACTIONS_FAIL,
      payload: formatError(error),
    });
  }
};

export const getNewActions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_ACTIONS_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/actions/new/', config);
    dispatch({ type: NEW_ACTIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_ACTIONS_FAIL,
      payload: formatError(error),
    });
  }
};

export const saveAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_ACTION_REQUEST });

    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(`/actions/${id}/save/`, {}, config);
    dispatch({ type: SAVE_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SAVE_ACTION_FAIL,
      payload: formatError(error),
    });
  }
};

export const deleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ACTION_REQUEST });

    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(`/actions/${id}/delete/`, {}, config);
    dispatch({ type: DELETE_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ACTION_FAIL,
      payload: formatError(error),
    });
  }
};

export const completeAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPLETE_ACTION_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(`/actions/${id}/complete/`, {}, config);
    dispatch({ type: COMPLETE_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COMPLETE_ACTION_FAIL, payload: formatError(error) });
  }
};

export const failedAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAILED_ACTION_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(`/actions/${id}/failed/`, {}, config);
    dispatch({ type: FAILED_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FAILED_ACTION_FAIL, payload: formatError(error) });
  }
};

export const automateAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: AUTOMATE_ACTION_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(`/actions/${id}/automate/`, {}, config);
    dispatch({ type: AUTOMATE_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTOMATE_ACTION_FAIL, payload: formatError(error) });
  }
};

export const shareAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHARE_ACTION_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.post(
      `/people/share/action/${id}/`,
      {},
      config
    );
    dispatch({ type: SHARE_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHARE_ACTION_FAIL, payload: formatError(error) });
  }
};

export const notAutomateAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: NOT_AUTOMATE_ACTION_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(`/actions/${id}/automate/`, {}, config);
    dispatch({ type: NOT_AUTOMATE_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: NOT_AUTOMATE_ACTION_FAIL, payload: formatError(error) });
  }
};

export const createAction = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ACTION_REQUEST });

    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.post(
      `/actions/create/`,
      { details },
      config
    );
    dispatch({ type: CREATE_ACTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ACTION_FAIL,
      payload: formatError(error),
    });
  }
};
