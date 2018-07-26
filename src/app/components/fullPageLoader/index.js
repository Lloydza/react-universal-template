import React, { Component } from 'react';

import styles from 'app/content/styles/components/fullPageLoader/index.css';

export default class FullPageLoader extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>LOADING...</h1>
        </div>
      </div>
    );
  }
};