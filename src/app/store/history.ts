import { createBrowserHistory } from 'history';

let history = null;

export default (): GenericObject => {
  if (!history) {
    history = createBrowserHistory();
  }

  return history;
};
