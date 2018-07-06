import React, { Component } from 'react';
import './App.css';

import Display from './components/Display';
import Controls from './components/Controls';
import ProductsList from './components/controls/ProductsList';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   fetch(
  //     'http://localhost:3001/SL.us008001/DF.of/DC.radar/DS.p94r0/SI.kewx/sn.last'
  //   );
  // }

  render() {
    return (
      <div className="App">
        <Display render={() => {}} />
        <Controls>
          <ProductsList products={[]} />
        </Controls>
      </div>
    );
  }
}

export default App;
