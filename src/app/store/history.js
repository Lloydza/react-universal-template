import { IS_SERVER } from 'app/utils/constants';
import { createBrowserHistory } from 'history';

let history = null;

export default () => {
  if (!history && !IS_SERVER) {
    history = createBrowserHistory();
  }

  return history;
};
