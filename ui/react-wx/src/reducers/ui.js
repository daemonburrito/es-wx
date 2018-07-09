// UI state
// This is a list of products that the decoder suite knows how to decode.
import { KNOWN_PRODUCTS } from '../lib/decoders/nexrad';

export const defaultUIState = {
  knownProducts: KNOWN_PRODUCTS
};

export default (state = defaultUIState, action) => {
  return state;
};
