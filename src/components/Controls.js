import React from 'react';
import PropTypes from 'prop-types';

class Controls extends React.Component {
  render() {
    return <section style={this.props.style}>{this.props.children}</section>;
  }
}

const defaultStyle = {
  border: '1px solid black'
};

Controls.propTypes = {
  style: PropTypes.object
};

Controls.defaultProps = {
  style: defaultStyle
};

export default Controls;
