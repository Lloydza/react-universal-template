import React, { Component } from 'react';
import { connect } from 'react-redux';
import getHistory from '../history';

import {
  loadSession
} from '../store/actions';

class HandleStart extends React.Component {
  componentDidMount() {
    var currentRoute = getHistory().location.pathname;
    this.props.onLoadSession(currentRoute);
  }

  render() {
    return null;
  }
}


var mapStateToProps = function(state) {
  return {
  }
};

var mapDispatchToProps = (dispatch) => {
  return {
  	onLoadSession: (currentRoute) => {
      dispatch(loadSession(currentRoute));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HandleStart);