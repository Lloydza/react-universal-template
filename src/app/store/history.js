import { createBrowserHistory } from 'history';

let history = null;

const getHistory = function () {
  if (!history) {
    history = createBrowserHistory();
  }

  return history;
};

export default getHistory;
