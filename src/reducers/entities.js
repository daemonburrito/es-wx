// Updates an entity cache in response to any action with response.entities.
export default (state = {}, action) => {
  if (action.response && action.response.entities) {
    return {
      ...state,
      ...action.response.entities
    };
  }

  return state;
};
