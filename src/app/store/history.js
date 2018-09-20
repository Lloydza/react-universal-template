import { createBrowserHistory } from 'history';

let history = null;

export default () => {
  if (!history) {
    history = createBrowserHistory();
  }

  return history;
};
