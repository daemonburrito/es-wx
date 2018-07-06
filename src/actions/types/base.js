// Convenience RAA action type generator and status flags

// Generates RAA-style action types for the api middleware
export const generateActionTypes = prefix => {
  const httpActions = ['REQUEST', 'SUCCESS', 'FAILURE'];
  return httpActions.map(action => {
    return `${prefix}_${action}`;
  });
};

export const REQUEST = 0;
export const SUCCESS = 1;
export const FAILURE = 2;

export const status = {
  REQUEST,
  SUCCESS,
  FAILURE
};

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
