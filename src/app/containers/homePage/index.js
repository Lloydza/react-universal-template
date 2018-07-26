import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from 'app/content/styles/containers/homePage/index.css';

import { 
  changeRoute
} from 'app/store/actions';

class HomePage extends Component {
  handleChangeRoute = (e) => {
    e.preventDefault();
    this.props.onchangeRoute("/other");
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          This is the Home Page
        </div>
        <div>
          <h3>App entry point: {this.props.initialRoute}</h3>
        </div>
        <div className={styles.button} onClick={this.handleChangeRoute}>Go to the other page.</div>
      </div>
    );
  }
};

var mapStateToProps = function(state) {
  return {
    initialRoute: state.session.initialRoute
  }
};

var mapDispatchToProps = (dispatch) => {
  return {
    onchangeRoute: (route) => {
      dispatch(changeRoute(route));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);