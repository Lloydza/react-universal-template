import config from '../../../config';
import * as actions from '../actions/index';

function session(state = { hasLoaded: false }, action) {
	switch (action.type) {
		case actions.UPDATE_SESSION_HAS_LOADED:
			return Object.assign({}, state, { 
				hasLoaded: action.hasLoaded
			});
		default:
			return state
	}
};
module.exports = session;