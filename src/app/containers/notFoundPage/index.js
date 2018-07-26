import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../../content/styles/containers/notFoundPage/index.css';

import { 
  changeRoute
} from '../../store/actions';

class NotFoundPage extends Component {
  handleChangeRoute = (e) => {
    e.preventDefault();
    this.props.onchangeRoute("/");
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>Oops! We couldn't find the page you are looking for.</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);