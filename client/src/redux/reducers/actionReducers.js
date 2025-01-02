import {
  // Action details
  ACTION_DETAILS_REQUEST,
  ACTION_DETAILS_SUCCESS,
  ACTION_DETAILS_FAIL,

  // Ongoing Actions
  ONGOING_ACTIONS_REQUEST,
  ONGOING_ACTIONS_SUCCESS,
  ONGOING_ACTIONS_FAIL,

  // Save action
  SAVE_ACTION_REQUEST,
  SAVE_ACTION_SUCCESS,
  SAVE_ACTION_FAIL,

  // New Action
  NEW_ACTIONS_REQUEST,
  NEW_ACTIONS_SUCCESS,
  NEW_ACTIONS_FAIL,

  // Delete Action
  DELETE_ACTION_SUCCESS,
  DELETE_ACTION_FAIL,
  DELETE_ACTION_REQUEST,

  // Complete Action
  COMPLETE_ACTION_REQUEST,
  COMPLETE_ACTION_SUCCESS,
  COMPLETE_ACTION_FAIL,

  // Failed Action
  FAILED_ACTION_REQUEST,
  FAILED_ACTION_SUCCESS,
  FAILED_ACTION_FAIL,

  // Automate Action
  AUTOMATE_ACTION_REQUEST,
  AUTOMATE_ACTION_SUCCESS,
  AUTOMATE_ACTION_FAIL,
  AUTOMATED_ACTIONS_REQUEST,
  AUTOMATED_ACTIONS_SUCCESS,
  AUTOMATED_ACTIONS_FAIL,
  NOT_AUTOMATE_ACTION_REQUEST,
  NOT_AUTOMATE_ACTION_SUCCESS,
  NOT_AUTOMATE_ACTION_FAIL,
  SHARE_ACTION_REQUEST,
  SHARE_ACTION_FAIL,
  SHARE_ACTION_SUCCESS,
  SAVED_ACTIONS_REQUEST,
  SAVED_ACTIONS_SUCCESS,
  SAVED_ACTIONS_FAIL,
} from '../../constants/actionsConstants';

export const actionDetailsReducer = (state = { action: {} }, action) => {
  switch (action.type) {
    case ACTION_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ACTION_DETAILS_SUCCESS:
      return { loading: false, action: action.payload };

    case ACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const savedActionsReducer = (state = { actions: [] }, action) => {
  switch (action.type) {
    case SAVED_ACTIONS_REQUEST:
    case DELETE_ACTION_REQUEST:
      return { loading: true, ...state };

    case SAVED_ACTIONS_SUCCESS:
      return { loading: false, actions: action.payload };

    case DELETE_ACTION_SUCCESS:
      return {
        loading: false,
        actions: [
          ...state.actions.filter(
            (savedAction) => savedAction.id !== action.payload.id
          ),
        ],
        message: 'Action updated!',
      };

    case SAVED_ACTIONS_FAIL:
    case DELETE_ACTION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ongoingActionsReducer = (state = { actions: [] }, action) => {
  switch (action.type) {
    case ONGOING_ACTIONS_REQUEST:
    case DELETE_ACTION_REQUEST:
    case COMPLETE_ACTION_REQUEST:
    case FAILED_ACTION_REQUEST:
    case AUTOMATE_ACTION_REQUEST:
      return { loading: true, ...state };

    case ONGOING_ACTIONS_SUCCESS:
      return { loading: false, actions: action.payload };

    case DELETE_ACTION_SUCCESS:
    case COMPLETE_ACTION_SUCCESS:
    case FAILED_ACTION_SUCCESS:
    case AUTOMATE_ACTION_SUCCESS:
      return {
        loading: false,
        actions: [
          ...state.actions.filter(
            (ongoingAction) => ongoingAction.id !== action.payload.id
          ),
        ],
        message: 'Action updated!',
      };

    case ONGOING_ACTIONS_FAIL:
    case DELETE_ACTION_FAIL:
    case COMPLETE_ACTION_FAIL:
    case FAILED_ACTION_FAIL:
    case AUTOMATE_ACTION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const automatedActionsReducer = (state = { actions: [] }, action) => {
  switch (action.type) {
    case AUTOMATED_ACTIONS_REQUEST:
    case NOT_AUTOMATE_ACTION_REQUEST:
      return { loading: true, ...state };

    case AUTOMATED_ACTIONS_SUCCESS:
      return { loading: false, actions: action.payload };

    case NOT_AUTOMATE_ACTION_SUCCESS:
      return {
        loading: false,
        actions: [
          ...state.actions.filter(
            (automatedAction) => automatedAction.id !== action.payload.id
          ),
        ],
        message: 'Action updated!',
      };

    case NOT_AUTOMATE_ACTION_FAIL:
    case AUTOMATED_ACTIONS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const newActionsReducer = (state = { actions: [] }, action) => {
  switch (action.type) {
    case NEW_ACTIONS_REQUEST:
    case SAVE_ACTION_REQUEST:
      return { loading: true, ...state };

    case NEW_ACTIONS_SUCCESS:
      return { loading: false, actions: action.payload };

    case NEW_ACTIONS_FAIL:
      return { loading: false, error: action.payload };

    case SAVE_ACTION_SUCCESS:
      // delete the Action from the new actions list
      return {
        loading: false,
        actions: [
          ...state.actions.filter(
            (newAction) => newAction.id !== action.payload.id
          ),
        ],
        message: 'Action saved!',
        actionId: action.payload.id,
      };

    case SAVE_ACTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const shareActionReducer = (state = {}, action) => {
  switch (action.type) {
    case SHARE_ACTION_REQUEST:
      return { loading: true };

    case SHARE_ACTION_SUCCESS:
      return { loading: false, message: 'Action Shared!' };

    case SHARE_ACTION_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
