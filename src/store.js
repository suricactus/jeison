import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';
import persistState from 'redux-localstorage';

console.log(process.env);
export const history = createHistory({
  basename: process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_BASE_URL : undefined
});

const initialState = {};

const enhancers = [
  persistState()
];

const middleware = [
  thunk,
  routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
  );

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  reducers,
  initialState,
  composedEnhancers
);

export default store;
