// UI state
// This is a list of products that the decoder suite knows how to decode.
import { KNOWN_PRODUCTS } from '../lib/decoders/nexrad';
import * as controlTypes from '../actions/types/control';
export const defaultUIState = {
  knownProducts: KNOWN_PRODUCTS,
  selectedProduct: 0
};

export default (state = defaultUIState, action) => {
  switch (action.type) {
  case controlTypes.PRODUCT_SELECTED:
    return {
      ...state,
      selectedProduct: action.productCode
    };
  default:
    return state;
  }
};
