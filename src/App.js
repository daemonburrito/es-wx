import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Workspace from './components/Workspace';

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
        <Header />
        <Workspace />
      </div>
    );
  }
}

export default App;
