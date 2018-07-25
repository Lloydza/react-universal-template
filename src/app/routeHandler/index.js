import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import { loadSession }  from 'app/store/actions/index';
import getHistory from 'app/store/history';
const history = getHistory();

// Pages
import HomePage from 'app/containers/homePage/index';
import OtherPage from 'app/containers/otherPage/index';
import NotFoundPage from 'app/containers/notFoundPage/index';

// Other Components
import FullPageLoader from 'app/components/FullPageLoader/index';

class RouteHandler extends Component {
	componentDidMount() {
		var currentRoute = getHistory().location.pathname;
    this.props.onLoadSession(currentRoute);
	}
	
	render() {
		if (!this.props.hasLoaded) {
			return <FullPageLoader />;
		}

		return (
			<div>
				<Router history={history}>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/other" component={OtherPage} />
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</Router>
			</div>
		);
	}
}

var mapStateToProps = function(state) {
  return {
		hasLoaded: state.session.hasLoaded
  }
};

var mapDispatchToProps = (dispatch) => {
  return {
  	onLoadSession: (currentRoute) => {
      dispatch(loadSession(currentRoute));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteHandler);
