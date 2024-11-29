import {
  // Details
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,

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

  // Signup
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,

  // Restore password email
  RESTORE_PASSWORD_EMAIL_REQUEST,
  RESTORE_PASSWORD_EMAIL_SUCCESS,
  RESTORE_PASSWORD_EMAIL_FAIL,

  // Restore password email
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,

  // Profile
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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case REFRESH_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
    case REFRESH_LOGIN_SUCCESS:
      return { user: action.payload, loading: false };

    case USER_LOGIN_FAIL:
      return { error: action.payload, loading: false };

    case REFRESH_LOGIN_FAIL:
      return { refreshError: action.payload, loading: false };

    case USER_LOGOUT_REQUEST:
      return { loading: true };

    case USER_LOGOUT_SUCCESS:
      return { loading: false, message: action.payload };

    case USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };

    case USER_SIGNUP_SUCCESS:
      return { loading: false, data: action.payload };

    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const restorePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTORE_PASSWORD_EMAIL_REQUEST:
      return { loading: true };

    case RESTORE_PASSWORD_EMAIL_SUCCESS:
      return { loading: false, message: action.payload };

    case RESTORE_PASSWORD_EMAIL_FAIL:
      return { loading: false, error: action.payload };

    case RESET_PASSWORD_REQUEST:
      return { loading: true };

    case RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload };

    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_ACCOUNT_REQUEST:
      return { loading: true };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case DELETE_ACCOUNT_SUCCESS:
      return { loading: false, message: action.payload };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case DELETE_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
