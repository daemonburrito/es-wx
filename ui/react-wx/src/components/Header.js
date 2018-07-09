import React from 'react';
import AppContext from '../context/app';

const Header = () => (
  <header>
    <AppContext.Consumer>{C => C.appTitle}</AppContext.Consumer>
  </header>
);

export default Header;
