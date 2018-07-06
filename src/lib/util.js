import bzip2 from 'bzip2';
import fs from 'fs';

export const bunzip = arrayBuf => {
  if (process.env.REACT_APP_DUMP_BZIP) {
    const OUTPUT_PATH = `${process.cwd()}/dump/out.last`,
    bytes = new Uint8Array(arrayBuf);

    console.warn('Dumping data to filesystem...');

    fs.writeFileSync(`${OUTPUT_PATH}.bz`, bytes);
    let data = Buffer.from(bzip2.simple(bzip2.array(new Uint8Array(arrayBuf))));
    fs.writeFileSync(OUTPUT_PATH, data);
  }
  return bzip2.simple(bzip2.array(new Uint8Array(arrayBuf))).buffer;
};

// Get the bit at position i on a byte or bytes
export const getBit = (uint8r, i, rIdx = 0) => (uint8r[rIdx] & (1 << i)) !== 0;
