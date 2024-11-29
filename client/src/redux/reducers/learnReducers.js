import {
  GET_COURSES_FAILED,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  COURSE_DETAILS_FAILED,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  UPDATE_COURSE_PROGRESS_REQUEST,
  UPDATE_COURSE_PROGRESS_FAILED,
  UPDATE_COURSE_PROGRESS_SUCCESS,
} from '../../constants/learnConstants';

export const coursesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_COURSES_REQUEST:
      return { loading: true, ...state };

    case GET_COURSES_SUCCESS:
      return { loading: false, courses: action.payload };

    case GET_COURSES_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true, ...state };

    case COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };

    case COURSE_DETAILS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const courseProgressReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COURSE_PROGRESS_REQUEST:
      return { loading: true, ...state };

    case UPDATE_COURSE_PROGRESS_SUCCESS:
      return { loading: false, progress: action.payload };

    case UPDATE_COURSE_PROGRESS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
