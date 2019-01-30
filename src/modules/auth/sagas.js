import { takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchAuthRequest,
  fetchAuthSuccess,
  fetchAuthUserDataError,
  fetchAuthFailure,
  doAuthLogout
} from './actions';
import { authorize } from '../../api';

export function* watchFetchAuthRequest() {
  yield takeLatest(fetchAuthRequest, function*({ payload }) {
    try {
      const result = yield call(authorize, payload);

      if (result.success) {
        localStorage.setItem('isLoggedIn', true);
        yield put(fetchAuthSuccess());
      } else {
        yield put(
          fetchAuthUserDataError('Неверное имя пользователя или пароль')
        );
      }
    } catch (error) {
      yield put(fetchAuthFailure('Произошла ошибка отправки данных'));
    }
  });
}

export function* watchDoAuthLogout() {
  yield takeLatest(doAuthLogout, () => {
    localStorage.removeItem('isLoggedIn');
  });
}
