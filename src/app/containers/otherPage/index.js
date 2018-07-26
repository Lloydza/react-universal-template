import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from 'app/content/styles/containers/otherPage/index.css';

import { 
  changeRoute
} from 'app/store/actions';

class OtherPage extends Component {
  handleChangeRoute = (e) => {
    e.preventDefault();
    this.props.onchangeRoute("/");
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          This is the Other Page
        </div>
        <div>
          <h3>App entry point: {this.props.initialRoute}</h3>
        </div>
        <div className={styles.button} onClick={this.handleChangeRoute}>Go to the home page.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherPage);