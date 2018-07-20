import { hydrateProductJSON } from '../../utils';

// cut
import Canvas from '../canvas';

// react-scripts includes webpack json-loader
import p94JSON from '../../__fixtures__/p94r0.kewx.json';

describe('Canvas processing', () => {
  it('returns a canvas', () => {
    // console.log(p94JSON);
    const product = hydrateProductJSON(p94JSON);
    // console.log({ product }, product.data.layers[0].radials[0]);
    const canvasEl = Canvas(product);
    // console.log(canvasEl);
    return;
  });
});
