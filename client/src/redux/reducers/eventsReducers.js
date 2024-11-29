import {
  CURRENT_EVENT_FAILED,
  CURRENT_EVENT_REQUEST,
  CURRENT_EVENT_SUCCESS,
  GET_SURVEY_FAILED,
  GET_SURVEY_REQUEST,
  GET_SURVEY_RESULTS_FAILED,
  GET_SURVEY_RESULTS_REQUEST,
  GET_SURVEY_RESULTS_SUCCESS,
  GET_SURVEY_SUCCESS,
  POST_SURVEY_FAILED,
  POST_SURVEY_REQUEST,
  POST_SURVEY_SUCCESS,
} from '../../constants/eventsConstants';

export const eventDetailsReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case CURRENT_EVENT_REQUEST:
      return { loading: true, ...state };

    case CURRENT_EVENT_SUCCESS:
      return { loading: false, event: action.payload };

    case CURRENT_EVENT_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const eventSurveyReducer = (state = { survey: {} }, action) => {
  switch (action.type) {
    case GET_SURVEY_REQUEST:
    case POST_SURVEY_REQUEST:
      return { loading: true, ...state };

    case GET_SURVEY_SUCCESS:
      return { loading: false, survey: action.payload };

    case POST_SURVEY_SUCCESS:
      return { loading: false, message: action.payload };

    case GET_SURVEY_FAILED:
    case POST_SURVEY_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const eventSurveyResultsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SURVEY_RESULTS_REQUEST:
      return { loading: true, ...state };

    case GET_SURVEY_RESULTS_SUCCESS:
      return { loading: false, results: action.payload };

    case GET_SURVEY_RESULTS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
