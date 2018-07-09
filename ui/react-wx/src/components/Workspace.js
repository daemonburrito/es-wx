import React from 'react';

import Controls from './Controls';
import Display from './Display';

import './Workspace.css';

class Workspace extends React.Component {
  render() {
    return (
      <section>
        <Display render={() => {}} />
        <Controls />
      </section>
    );
  }
}

Workspace.propTypes = {};

export default Workspace;
