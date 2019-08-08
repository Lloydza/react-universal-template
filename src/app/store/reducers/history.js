import * as actions from 'app/store/actions';
import { deeplyCloneObject, findQueryParams } from 'app/utils/utilFunctions';

const defaultState = () => {
  return { stack: [], currentRoute: '/', currentQueryParams: {} };
};

let currentQueryParams;

export default (state = defaultState(), action) => {
  switch (action.type) {
    case actions.CHANGE_ROUTE:
      if (state.currentRoute === action.newPathname) {
        return state;
      }

      currentQueryParams = findQueryParams(action.newPathname);
      return Object.assign({}, state, {
        stack: [...state.stack, { route: action.newPathname, queryParams: currentQueryParams }],
        currentRoute: action.newPathname,
        currentQueryParams,
      });
    case actions.PREVIOUS_ROUTE:
      if (state.stack.length === 0) {
        return state;
      }

      const stack = deeplyCloneObject(state.stack);
      stack.pop();
      const currentRoute = stack.length > 0 ? stack[stack.length - 1].route : '/';
      currentQueryParams = stack.length > 0 ? stack[stack.length - 1].queryParams : {};
      return Object.assign({}, state, { stack, currentRoute, currentQueryParams });
    default:
      return state;
  }
};
