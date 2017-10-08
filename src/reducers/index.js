import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {reducer as toastrReducer} from 'react-redux-toastr';

import editorsReducer from '../routes/editor/reducers/editorsReducer';
import validatorsReducer from '../routes/validator/reducers/validatorsReducer';
import diffsReducer from '../routes/diff/reducers/diffsReducer';
import schemaList from '../data/schemas.json';

const rootReducer = combineReducers({
  editors: editorsReducer,
  validators: validatorsReducer,
  diffs: diffsReducer,
  routing: routerReducer,
  toastr: toastrReducer,
  schemaList: () => schemaList
});

export default rootReducer;
