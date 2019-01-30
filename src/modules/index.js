import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';

import auth from './auth';
import { watchFetchAuthRequest, watchDoAuthLogout } from './auth/sagas';

export function* sagas() {
  yield fork(watchFetchAuthRequest);
  yield fork(watchDoAuthLogout);
}

export default combineReducers({ auth });
