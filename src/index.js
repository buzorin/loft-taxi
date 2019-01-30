import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import getStore from './store';

import './index.css';
import Layout from './components/Layout';

const store = getStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
