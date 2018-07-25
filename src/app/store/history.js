import { createBrowserHistory } from 'history';

var history = null;

var getHistory = function () {
	if (!history) {
		history = createBrowserHistory();
	}

	return history;
};

export default getHistory;
