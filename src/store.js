import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './modules';
import { sagas } from './modules/';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop
    )
  );

  sagaMiddleware.run(sagas);

  return store;
};
