import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../../content/styles/components/loading/index.css';

class Loading extends Component {
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

var mapStateToProps = function(state) {
  return {
  }
};

var mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);