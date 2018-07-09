// Application context
import React from 'react';
import * as C from '../constants';
import { KNOWN_PRODUCTS } from '../lib/decoders/nexrad';

export default React.createContext({
  appTitle: C.HEADER_TITLE,
  locale: C.LOCALE,
  products: KNOWN_PRODUCTS
});
