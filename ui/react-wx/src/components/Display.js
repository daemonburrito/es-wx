import React from 'react';
import PropTypes from 'prop-types';

import Viewport from './display/Viewport';

const Display = class extends React.Component {
  render() {
    return <Viewport />;
  }
};

// Display.propTypes = {
//   ui: PropTypes.func
// };
//
// Display.defaultProps = {
//   ui: {}
// };

export default Display;
