import * as actions from '../actions/index';

function sessionReducer(state = { hasLoaded: false, initialRoute: '' }, action) {
	switch (action.type) {
		case actions.UPDATE_SESSION_HAS_LOADED:
			return Object.assign({}, state, { 
				hasLoaded: action.hasLoaded
			});
		case actions.UPDATE_SESSION_SET_INTIAL_ROUTE:
			return Object.assign({}, state, { 
				initialRoute: action.initialRoute
			});
		default:
			return state
	}
};
module.exports = sessionReducer;
