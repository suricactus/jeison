import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';

import App from './components/App';
import EditorsRoute from './routes/editor/EditorsRoute';
import ValidatorsRoute from './routes/validator/ValidatorsRoute';
import DiffsRoute from './routes/diff/DiffsRoute';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
