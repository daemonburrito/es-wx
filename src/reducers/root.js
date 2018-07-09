import { combineReducers } from 'redux';
import entities from './entities';
import errors from './errors';
import ui from './ui';

const rootReducer = combineReducers({
  entities,
  errors,
  ui
});

export default rootReducer;
