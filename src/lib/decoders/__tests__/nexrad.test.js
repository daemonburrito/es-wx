import React from 'react';
import ReactDOM from 'react-dom';

import fs from 'fs';
import process from 'process';

// cut
import { decodeP94 } from '../nexrad.js';

const CWD = process.cwd();
const N0R_PATH = `${CWD}/src/lib/decoders/__fixtures__/sn.last`;

describe('Nexrad Level III decoders', () => {
  it('decodes', () => {
    // get some bytes to make a buffer from
    // read the whole file, which is guaranteed to be tiny
    let buf = fs.readFileSync(N0R_PATH);
    const product = decodeP94(buf.buffer);
    // console.log(JSON.stringify(product, null, '\t'));
    return;
  });
});
