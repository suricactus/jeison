import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import editorsReducer from '../routes/editor/reducers/editorsReducer';
import validatorsReducer from '../routes/validator/reducers/validatorsReducer';
import schemaList from '../data/schemas.json';

const rootReducer = combineReducers({
  editors: editorsReducer,
  validators: validatorsReducer,
  routing: routerReducer,
  schemaList: () => schemaList
});

export default rootReducer;
