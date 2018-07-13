import React from 'react';
import ReactDOM from 'react-dom';

import fs from 'fs';
import process from 'process';

// cut
import { decodeP94 } from '../nexrad.js';

import p94JSON from '../../__fixtures__/p94r0.kewx.json';

const CWD = process.cwd();
const P94_PATH = `${CWD}/src/lib/decoders/__fixtures__/p94r0.kewx.bin`;

describe('Nexrad Level III decoders', () => {
  let buf, product;

  describe('94 - Base Reflectivity Data Array', () => {
    // get some bytes to make a buffer from
    // read the whole file, which is guaranteed to be tiny
    buf = fs.readFileSync(P94_PATH);

    it('decodes without throwing', () => {
      expect(() => {
        product = decodeP94(buf.buffer);
      }).not.toThrow();
      //console.log(JSON.stringify(product, null, '\t'));
    });

    it('reads ascii header', () => {
      expect(product.asciiHeader).toEqual(p94JSON.asciiHeader);
    });

    it('reads product header', () => {
      expect(product.productHeader).toEqual(p94JSON.productHeader);
    });

    it('reads product description', () => {
      expect(product.productDescription).toEqual(p94JSON.productDescription);
    });

    it('reads product data information', () => {
      expect(product.data.blockId).toEqual(1);
      expect(product.data.blockLength).toEqual(167790);
      expect(product.data.layersCount).toEqual(1);
    });
  });
});
