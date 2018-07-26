import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

// Pages
import HomePage from 'app/containers/homePage/index';
import OtherPage from 'app/containers/otherPage/index';
import NotFoundPage from 'app/containers/notFoundPage/index';

export default class RouteHandler extends Component {
	render() {
		return (
			<div>
				<Router history={this.props.history}>
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
