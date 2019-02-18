import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {
  fetchAuthRequest,
  fetchAuthSuccess,
  fetchAuthFailure,
  doAuthLogout
} from './actions';

const isLoading = handleActions(
  {
    [fetchAuthRequest]: () => true,
    [fetchAuthSuccess]: () => false,
    [fetchAuthFailure]: () => false
  },
  false
);

const isLoggedIn = handleActions(
  {
    [fetchAuthSuccess]: () => true,
    [doAuthLogout]: () => false
  },
  localStorage.getItem('isLoggedIn') ? true : false
);

const error = handleActions(
  {
    [fetchAuthRequest]: () => null,
    [fetchAuthFailure]: (_store, { payload }) => payload
  },
  null
);

export default combineReducers({
  isLoading,
  isLoggedIn,
  error
});

// const initialState = {
//   isLoading: false,
//   isLoggedIn: false,
//   error: null
// };

// export default (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case fetchAuthRequest.toString():
//       return {
//         ...state,
//         isLoading: true,
//         error: null
//       };

//     case fetchAuthSuccess.toString():
//       return {
//         ...state,
//         isLoading: false,
//         isLoggedIn: true
//       };

//     case fetchAuthFailure.toString():
//       return {
//         ...state,
//         isLoading: false,
//         error: payload
//       };

//     default:
//       return state;
//   }
// };
