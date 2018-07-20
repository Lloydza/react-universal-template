import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';

import getHistory from '../store/history';
const history = getHistory();

// Pages
import HomePage from '../containers/HomePage/index';

// Other Components
import FullPageLoader from '../components/FullPageLoader/index';

const MainRouter = (
	<Router history={history}>
		<Switch>
			<Route exact path="/" component={HomePage} />
		</Switch>
  </Router>
);

class RouteHandler extends Component {
	constructor(props) {
    super(props);
    this.state = {
      loaded: true // use false if you want to implement some loading (see componentDidMount())
    };
	}

	componentDidMount() {
    // Could set up to use a loader if required (eg: if we a getting auth token from local storage async)
		//this.setState({ loaded: true });
	}
	
	render() {
		if (!this.state.loaded) {
			return <FullPageLoader />;
		}

		return (
			<div>
				{MainRouter}
			</div>
		);
	}
}

var mapStateToProps = function(state) {
  return {
  }
};

var mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteHandler);