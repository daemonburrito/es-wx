import React from 'react';

import Controls from './Controls';
import Display from './Display';
import ProductsList from './controls/ProductsList';

import './Workspace.css';

class Workspace extends React.Component {
  render() {
    return (
      <section>
        <Display render={() => {}} />
        <Controls>
          <ProductsList products={[]} />
        </Controls>
      </section>
    );
  }
}

Workspace.propTypes = {};

export default Workspace;
