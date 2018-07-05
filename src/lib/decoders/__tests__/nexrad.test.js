import React from 'react';
import ReactDOM from 'react-dom';

import fs from 'fs';
import process from 'process';

// cut
import { decodeN0R } from '../nexrad.js';

const CWD = process.cwd();
const N0R_PATH = `${CWD}/src/lib/decoders/__fixtures__/sn.last`;

describe('Nexrad Level III decoders', () => {
  it('decodes', () => {
    // get some bytes to make a buffer from
    // read the whole file, which is guaranteed to be tiny
    let buf = fs.readFileSync(N0R_PATH);
    // console.log({ buf });
    decodeN0R(buf.buffer);
    return;
  });
});
