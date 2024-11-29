import backend from '../../api/backend';
import {
  // Sign up
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,

  // Login
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  // Refresh
  REFRESH_LOGIN_REQUEST,
  REFRESH_LOGIN_SUCCESS,
  REFRESH_LOGIN_FAIL,

  // Logout
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,

  // Details
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,

  // Restore password email
  RESTORE_PASSWORD_EMAIL_REQUEST,
  RESTORE_PASSWORD_EMAIL_SUCCESS,
  RESTORE_PASSWORD_EMAIL_FAIL,

  // Reset password
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,

  // Update profile
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
} from '../../constants/userConstants';
import { createConfig, formatError } from './utils';

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/users/profile/', config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: formatError(error),
    });
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    const config = {
      header: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };
    const {
      fullName,
      username,
      email,
      password,
      passwordRepeat,
      privacyPolicy,
    } = formData;

    let { data } = await backend.post(
      '/users/signup/',
      { fullName, username, email, password, passwordRepeat, privacyPolicy },
      config
    );
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: formatError(error),
    });
  }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      header: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    let { data } = await backend.post(
      '/users/login/',
      { email, password, rememberMe },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: formatError(error),
    });
  }
};

export const refreshLogin = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_LOGIN_REQUEST });
    let { data } = await backend.post(
      '/users/login/refresh/',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: REFRESH_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REFRESH_LOGIN_FAIL,
      payload: formatError(error),
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });
    let { data } = await backend.post(
      '/users/logout/',
      {},
      {
        withCredentials: true,
      }
    );
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: formatError(error),
    });
  }
};

export const restorePasswordRequest = (email) => async (dispatch) => {
  try {
    dispatch({ type: RESTORE_PASSWORD_EMAIL_REQUEST });
    const config = {
      header: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    let { data } = await backend.post(
      '/auth/password_reset/',
      { email },
      config
    );
    dispatch({ type: RESTORE_PASSWORD_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESTORE_PASSWORD_EMAIL_FAIL,
      payload: formatError(error),
    });
  }
};

export const resetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    const config = {
      header: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    };

    let { data } = await backend.post(
      '/auth/password_reset/confirm/',
      { password, token },
      config
    );
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: formatError(error),
    });
  }
};

export const updateProfile =
  (fullName, email, username, bio) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });
      let accessToken = getState().userLogin?.user?.tokens?.access;
      const config = createConfig(accessToken);

      let { data } = await backend.post(
        '/account/update/profile/',
        { fullName, email, username, bio },
        config
      );
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: formatError(error),
      });
    }
  };

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      let accessToken = getState().userLogin?.user?.tokens?.access;
      const config = createConfig(accessToken);

      let { data } = await backend.post(
        '/account/update/password/',
        { oldPassword, newPassword, confirmPassword },
        config
      );
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: formatError(error),
      });
    }
  };

export const deleteAccount = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ACCOUNT_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);

    let { data } = await backend.post(
      '/account/update/delete/',
      { password },
      config
    );
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
      payload: formatError(error),
    });
  }
};
