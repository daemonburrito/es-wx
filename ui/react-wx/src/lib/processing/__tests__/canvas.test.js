// cut
import Canvas from '../canvas';

// react-scripts includes webpack json-loader
import p94JSON from '../__fixtures__/p94r0.kewx.json';

describe('Canvas processing', () => {
  it('returns a canvas', () => {
    // console.log(p94JSON);
    const canvasEl = Canvas(p94JSON);
    console.log(canvasEl);
    return;
  });
});
