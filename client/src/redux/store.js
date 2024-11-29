import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import {
  actionDetailsReducer,
  automatedActionsReducer,
  newActionsReducer,
  ongoingActionsReducer,
  shareActionReducer,
} from './reducers/actionReducers';
import {
  eventDetailsReducer,
  eventSurveyReducer,
  eventSurveyResultsReducer,
} from './reducers/eventsReducers';
import {
  courseDetailsReducer,
  courseProgressReducer,
  coursesReducer,
} from './reducers/learnReducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userSignUpReducer,
  restorePasswordReducer,
  updateAccountReducer,
} from './reducers/userReducers';
import {
  feedReducer,
  followersReducer,
  followingReducer,
  peopleReducer,
  personReducer,
} from './reducers/peopleReducers';

const reducer = combineReducers({
  // Actions
  actionDetails: actionDetailsReducer,
  newActions: newActionsReducer,
  ongoingActions: ongoingActionsReducer,
  automatedActions: automatedActionsReducer,
  shareActions: shareActionReducer,

  // User
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  userDetails: userDetailsReducer,
  updateAccount: updateAccountReducer,
  restorePassword: restorePasswordReducer,

  // Learn
  courses: coursesReducer,
  courseDetails: courseDetailsReducer,
  courseProgress: courseProgressReducer,

  // Event
  eventDetails: eventDetailsReducer,
  eventSurvey: eventSurveyReducer,
  eventSurveyResults: eventSurveyResultsReducer,

  // People
  people: peopleReducer,
  person: personReducer,
  following: followingReducer,
  followers: followersReducer,
  feed: feedReducer,
});

const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
