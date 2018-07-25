import getHistory from '../../history';

function changeRoute(route) {
	return function (dispatch, getState) {	
		let history = getHistory();
		history.push(route);
	}
};
exports.changeRoute = changeRoute;

function previousRoute() {
	return function (dispatch, getState) {
		let history = getHistory();
		history.goBack();
	}
};
exports.previousRoute = previousRoute;
