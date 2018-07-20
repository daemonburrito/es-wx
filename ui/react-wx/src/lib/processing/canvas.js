// HTML Canvas processing module
// Outputs an HTML canvas given a dataset.
import { makeScale } from '../utils';
import { DEGS_TO_RADS } from '../constants';

export const SVGSink = input => {
  // first try:
  // use arcs and transforms of a unit circle to take advantage /
  // of SVGs curves.
  const radialBin = (level, number) => {
    const BIN_HEIGHT = 1;

    const scale = makeScale(0, 255),
    pathStart = number - 1,
    color = scale(level) >= 0 ? scale(level) : 0,
    r = number * BIN_HEIGHT;

    const binPathD = `
    M 0,0
    l 0,${number}
    a ${r},${r}
    0,0,0
    ${Math.cos(r * DEGS_TO_RADS[1])},${Math.sin(r * DEGS_TO_RADS[1])}
    z
    `;

    const s = `<path stroke-width="1" id="radialSlice"
      d="${binPathD}"/>\n`;

    return s;
  };

  const radialPathMarkup = input.data.layers[0].radials[0].bins.reduce(
    (s, level, i) => {
      return s + radialBin(level, i);
    }
  );

  return `<svg width="300" height="300" viewBox="0 0 300 300" transform="scale(1,-1) translate(150, 150)">
  <g>
    ${radialPathMarkup}
  </g>
</svg>`;
};

const Canvas = input => {
  // first implementation: radial data
  // const radial = () => {};
  // internally, we're just wrapping the svg implementation.
  return SVGSink(input);
};

export default Canvas;
