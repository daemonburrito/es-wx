import { createSelector } from 'reselect';

export const uiSelector = state => state.ui;

export const knownProductsSelector = createSelector(
  uiSelector,
  uiState => uiState.knownProducts
);
