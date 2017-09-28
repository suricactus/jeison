import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


import editorsReducer from '../routes/editors/reducers/editorsReducer';


const rootReducer = combineReducers({
  editors: editorsReducer,
  routing: routerReducer
});

export default rootReducer;