import { IS_SERVER } from 'utils/constants';
import { createBrowserHistory } from 'history';

let history = null;

export default (): GenericObject => {
  if (!history && !IS_SERVER) {
    history = createBrowserHistory();
  }

  return history;
};
