import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../../content/styles/components/other/index.css';

import { 
  changeRoute
} from '../../store/actions';

class Other extends Component {
  constructor(props) {
    super(props);

    this.handleChangeRoute = this.handleChangeRoute.bind(this);
  }

  handleChangeRoute(e) {
    e.preventDefault();

    this.props.onchangeRoute("/");
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>This is the Other Page.</h1>
        </div>
        <div>
          <h3>App entry point: {this.props.serverPage}</h3>
        </div>
        <div className={styles.button} onClick={this.handleChangeRoute}>Go to the home page.</div>
      </div>
    );
  }
};

var mapStateToProps = function(state) {
  return {
    serverPage: state.session.serverPage
  }
};

var mapDispatchToProps = (dispatch) => {
  return {
    onchangeRoute: (route) => {
      dispatch(changeRoute(route));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Other);