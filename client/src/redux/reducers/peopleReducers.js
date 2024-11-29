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
  EMPTY_SEARCH,

  // Follow Person
  FOLLOW_PERSON_FAILED,
  FOLLOW_PERSON_REQUEST,
  FOLLOW_PERSON_SUCCESS,

  // Unfollow Person
  UNFOLLOW_PERSON_FAILED,
  UNFOLLOW_PERSON_REQUEST,
  UNFOLLOW_PERSON_SUCCESS,

  // Person Details
  PERSON_DETAILS_REQUEST,
  PERSON_DETAILS_SUCCESS,
  PERSON_DETAILS_FAILED,

  // Feed
  GET_FEED_REQUEST,
  GET_FEED_FAILED,
  GET_FEED_SUCCESS,
} from '../../constants/peopleConstants';

export const peopleReducer = (state = { people: [] }, action) => {
  switch (action.type) {
    case GET_PEOPLE_REQUEST:
    case GET_SEARCH_REQUEST:
      return { loading: true, ...state };

    case GET_PEOPLE_SUCCESS:
    case GET_SEARCH_SUCCESS:
    case EMPTY_SEARCH:
      return { loading: false, people: action.payload };

    case GET_PEOPLE_FAILED:
    case GET_SEARCH_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const personReducer = (state = {}, action) => {
  switch (action.type) {
    case PERSON_DETAILS_REQUEST:
      return { loading: true };

    case PERSON_DETAILS_SUCCESS:
      return { loading: false, person: action.payload };

    case PERSON_DETAILS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const followingReducer = (state = { following: [] }, action) => {
  switch (action.type) {
    case GET_FOLLOWING_REQUEST:
    case FOLLOW_PERSON_REQUEST:
    case UNFOLLOW_PERSON_REQUEST:
      return { loading: true, ...state };

    case GET_FOLLOWING_SUCCESS:
      return { loading: false, following: action.payload };

    case FOLLOW_PERSON_SUCCESS:
      return {
        loading: false,
        following: [...state.following.append(action.payload)],
      };

    case UNFOLLOW_PERSON_SUCCESS:
      return {
        loading: false,
        following: [
          ...state.actions.filter((person) => person.id !== action.payload.id),
        ],
      };
    case GET_FOLLOWING_FAILED:
    case FOLLOW_PERSON_FAILED:
    case UNFOLLOW_PERSON_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const feedReducer = (state = { content: [] }, action) => {
  switch (action.type) {
    case GET_FEED_REQUEST:
      return { loading: true, ...state };

    case GET_FEED_SUCCESS:
      return { loading: false, content: action.payload };

    case GET_FEED_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const followersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FOLLOWERS_REQUEST:
      return { loading: true, ...state };
    case GET_FOLLOWERS_SUCCESS:
      return { loading: false, followers: action.payload };
    case GET_FOLLOWERS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
