import React from 'react';

import Controls from './Controls';
import Display from './Display';
import withUI from '../containers/hoc/withUI';

import './Workspace.css';

const ControlsUI = withUI(Controls),
DisplayUI = withUI(Display);

class Workspace extends React.Component {
  render() {
    return (
      <section>
        <DisplayUI />
        <ControlsUI />
      </section>
    );
  }
}

Workspace.propTypes = {};

export default Workspace;
