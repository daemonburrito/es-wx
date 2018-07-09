import * as types from './types/control';

export const selectProduct = productCode => ({
  type: types.PRODUCT_SELECTED,
  productCode
});

export { types };
