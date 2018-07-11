// This is the bridge between the decoder library and redux.
import * as types from './types/product';

export const startProductDecode = bytes => ({
  type: types.PRODUCT_DECODE_START,
  bytes
});

export const productDecodeSuccess = product => ({
  type: types.PRODUCT_DECODE_SUCCESS,
  productCode: product.productHeader.messageCode,
  productData: product.data
});

export const productDecodeFailure = error => ({
  type: types.PRODUCT_DECODE_FAILURE,
  error
});
