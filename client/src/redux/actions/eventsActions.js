import backend from '../../api/backend';
import {
  CURRENT_EVENT_REQUEST,
  CURRENT_EVENT_SUCCESS,
  CURRENT_EVENT_FAILED,
  GET_SURVEY_REQUEST,
  GET_SURVEY_SUCCESS,
  GET_SURVEY_FAILED,
  POST_SURVEY_SUCCESS,
  POST_SURVEY_FAILED,
  POST_SURVEY_REQUEST,
  GET_SURVEY_RESULTS_REQUEST,
  GET_SURVEY_RESULTS_SUCCESS,
  GET_SURVEY_RESULTS_FAILED,
} from '../../constants/eventsConstants';
import { formatError, getCookie } from './utils';

export const getCurrentEvent = () => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_EVENT_REQUEST });
    const { data } = await backend.get(`/events/current/`);
    dispatch({ type: CURRENT_EVENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CURRENT_EVENT_FAILED,
      payload: formatError(error),
    });
  }
};

export const getSurvey = (event_id, topic_number) => async (dispatch) => {
  try {
    dispatch({ type: GET_SURVEY_REQUEST });
    const { data } = await backend.get(
      `/events/${event_id}/${topic_number}/survey`
    );
    dispatch({ type: GET_SURVEY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SURVEY_FAILED,
      payload: formatError(error),
    });
  }
};

export const postSurvey =
  (event_id, topic_number, results) => async (dispatch) => {
    try {
      dispatch({ type: POST_SURVEY_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        withCredentials: true,
      };
      const { data } = await backend.post(
        `/events/${event_id}/${topic_number}/survey/`,
        { results },
        config
      );
      dispatch({ type: POST_SURVEY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: POST_SURVEY_FAILED, payload: formatError(error) });
    }
  };

export const getSurveyResults =
  (event_id, topic_number) => async (dispatch) => {
    try {
      dispatch({ type: GET_SURVEY_RESULTS_REQUEST });
      const { data } = await backend.get(
        `/events/${event_id}/${topic_number}/survey/results/`
      );
      dispatch({ type: GET_SURVEY_RESULTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SURVEY_RESULTS_FAILED,
        payload: formatError(error),
      });
    }
  };
