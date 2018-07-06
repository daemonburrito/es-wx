import { combineReducers } from 'redux';
import entities from './entities';
import errors from './errors';

const rootReducer = combineReducers({
  entities,
  errors
});

export default rootReducer;
