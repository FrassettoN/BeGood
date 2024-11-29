import backend from '../../api/backend';
import {
  // Get Followers
  GET_FOLLOWERS_FAILED,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,

  // Get Following
  GET_FOLLOWING_FAILED,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,

  // Get People
  GET_PEOPLE_FAILED,
  GET_PEOPLE_REQUEST,
  GET_PEOPLE_SUCCESS,

  // Search
  GET_SEARCH_FAILED,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,

  // Follow Person
  FOLLOW_PERSON_FAILED,
  FOLLOW_PERSON_REQUEST,
  FOLLOW_PERSON_SUCCESS,

  // Unfollow Person
  UNFOLLOW_PERSON_FAILED,
  UNFOLLOW_PERSON_REQUEST,
  UNFOLLOW_PERSON_SUCCESS,
  EMPTY_SEARCH,
  PERSON_DETAILS_REQUEST,
  PERSON_DETAILS_SUCCESS,
  PERSON_DETAILS_FAILED,
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILED,
} from '../../constants/peopleConstants';
import { createConfig, formatError, validateSearchQuery } from './utils';

export const getPeople = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_PEOPLE_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/people/', config);
    dispatch({ type: GET_PEOPLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PEOPLE_FAILED,
      payload: formatError(error),
    });
  }
};

export const getPerson = (username) => async (dispatch, getState) => {
  try {
    if (username && username !== '.') {
      dispatch({ type: PERSON_DETAILS_REQUEST });
      let accessToken = getState().userLogin?.user?.tokens?.access;
      const config = createConfig(accessToken);
      const { data } = await backend.get(`/people/${username}/visit/`, config);
      dispatch({ type: PERSON_DETAILS_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: PERSON_DETAILS_FAILED,
      payload: formatError(error),
    });
  }
};

export const getFollowing = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FOLLOWING_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/people/following/', config);
    dispatch({ type: GET_FOLLOWING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWING_FAILED,
      payload: formatError(error),
    });
  }
};

export const getFeed = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FEED_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/people/feed/', config);
    dispatch({ type: GET_FEED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FEED_FAILED,
      payload: formatError(error),
    });
  }
};

export const getFollowers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_FOLLOWERS_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.get('/people/followers/', config);
    dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWERS_FAILED,
      payload: formatError(error),
    });
  }
};

export const getSearchPeople = (query) => async (dispatch, getState) => {
  try {
    if (validateSearchQuery(query)) {
      dispatch({ type: GET_SEARCH_REQUEST });
      let accessToken = getState().userLogin?.user?.tokens?.access;
      const config = createConfig(accessToken);
      const { data } = await backend.get(
        `/people/search/${encodeURIComponent(query)}`,
        config
      );
      dispatch({ type: GET_SEARCH_SUCCESS, payload: data });
    } else {
      dispatch({ type: EMPTY_SEARCH, payload: [] });
    }
  } catch (error) {
    dispatch({
      type: GET_SEARCH_FAILED,
      payload: formatError(error),
    });
  }
};

export const followPerson = (username) => async (dispatch, getState) => {
  try {
    dispatch({ type: FOLLOW_PERSON_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(
      `/people/interact/${username}/follow/`,
      {},
      config
    );
    dispatch({ type: FOLLOW_PERSON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FOLLOW_PERSON_FAILED, payload: formatError(error) });
  }
};

export const unfollowPerson = (username) => async (dispatch, getState) => {
  try {
    dispatch({ type: UNFOLLOW_PERSON_REQUEST });
    let accessToken = getState().userLogin?.user?.tokens?.access;
    const config = createConfig(accessToken);
    const { data } = await backend.put(
      `/people/interact/${username}/unfollow/`,
      {},
      config
    );
    dispatch({ type: UNFOLLOW_PERSON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UNFOLLOW_PERSON_FAILED, payload: formatError(error) });
  }
};
