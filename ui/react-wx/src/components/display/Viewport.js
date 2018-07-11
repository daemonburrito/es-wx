import React from 'react';
import PropTypes from 'prop-types';

const Viewport = class extends React.Component {
  render() {
    return (
      <div id="viewport">
        {this.props.loading ? <span>Loading...</span> : null}
      </div>
    );
  }
};

Viewport.propTypes = {
  loading: PropTypes.bool
};

Viewport.defaultProps = {
  loading: false
};

export default Viewport;
