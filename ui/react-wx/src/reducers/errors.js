import * as types from '../actions/types/base';

export default (state = null, action) => {
  const { type, error } = action;

  if (type === types.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }

  return state;
};
