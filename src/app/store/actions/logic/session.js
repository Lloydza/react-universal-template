export const UPDATE_SESSION_HAS_LOADED = 'UPDATE_SESSION_HAS_LOADED';

function updateSessionHasLoaded(hasLoaded) {
	return {
		type: UPDATE_SESSION_HAS_LOADED,
		hasLoaded: hasLoaded
	}
};
exports.updateSessionHasLoaded = updateSessionHasLoaded;

function loadSession(currentRoute) {
	return function (dispatch, getState) {
		// Add in any session logic or local storage get here.
		dispatch(updateSessionHasLoaded(true));
	}
}
exports.loadSession = loadSession;