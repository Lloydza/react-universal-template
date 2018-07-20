import React, { Component } from 'react';

import Header from '../Header/index';
import Loader from '../Loader/index';

export default class FullPageLoader extends Component {
  render() {
    return (
      <div>
        <Header />
        <Loader />
      </div>
    );
  }
};