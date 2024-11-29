import backend from '../../api/backend';
import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILED,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAILED,
  UPDATE_COURSE_PROGRESS_SUCCESS,
  UPDATE_COURSE_PROGRESS_REQUEST,
  UPDATE_COURSE_PROGRESS_FAILED,
} from '../../constants/learnConstants';
import { createConfig, formatError } from './utils';

export const getCourses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_COURSES_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/learn/courses/', config);
    dispatch({ type: GET_COURSES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COURSES_FAILED,
      payload: formatError(error),
    });
  }
};

export const getCourseDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get(`/learn/courses/${id}/`, config);
    dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAILED,
      payload: formatError(error),
    });
  }
};

export const updateCourseProgress =
  (id, topic, lesson) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_COURSE_PROGRESS_REQUEST });

      let accessToken = getState().userLogin?.user?.tokens?.access;
      const config = createConfig(accessToken);
      const { data } = await backend.put(
        `/learn/courses/${id}/progress/`,
        { topic, lesson },
        config
      );
      dispatch({ type: UPDATE_COURSE_PROGRESS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_COURSE_PROGRESS_FAILED,
        payload: formatError(error),
      });
    }
  };
