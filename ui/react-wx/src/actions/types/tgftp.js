import { generateActionTypes } from './base';

export const fetchLatestProductTypes = generateActionTypes(
  'FETCH_LATEST_PRODUCT'
);

export { REQUEST, SUCCESS, FAILURE } from './base';
