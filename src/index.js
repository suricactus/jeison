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
      <App>
        <Switch>
          <Route path='/editor/:tabIndex' render={props => {
            return (store.getState().editors[ props.match.params.tabIndex ])
              ? <EditorsRoute {...props} />
              : <Redirect to='/editor' />;
          }} />
          <Redirect from='/editor' to='/editor/0' />
          <Route path='/validator/:tabIndex' render={props => {
            return (store.getState().validators[ props.match.params.tabIndex ])
              ? <ValidatorsRoute {...props} />
              : <Redirect to='/validator' />;
          }} />
          <Redirect from='/validator' to='/validator/0' />
          <Route path='/diff/:tabIndex' render={props => {
            return (store.getState().diffs[ props.match.params.tabIndex ])
              ? <DiffsRoute {...props} />
              : <Redirect to='/diff' />;
          }} />
          <Redirect from='/diff' to='/diff/0' />
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
