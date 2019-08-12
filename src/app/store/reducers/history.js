import * as actions from 'app/store/actions';
import { deeplyCloneObject, findQueryParams } from 'app/utils/utilFunctions';

const defaultState = () => {
  return { stack: [], currentRoute: '/', currentQueryParams: {} };
};

let currentRoute;
let currentQueryParams;
let stack;

export default (state = defaultState(), action) => {
  switch (action.type) {
    case actions.CHANGE_ROUTE:
      if (state.currentRoute === action.newPathname) {
        return state;
      }

      currentQueryParams = findQueryParams(action.newPathname);
      return {
        ...state,
        stack: [...state.stack, { route: action.newPathname, queryParams: currentQueryParams }],
        currentRoute: action.newPathname,
        currentQueryParams,
      };
    case actions.PREVIOUS_ROUTE:
      if (state.stack.length === 0) {
        return state;
      }

      stack = deeplyCloneObject(state.stack);
      stack.pop();
      currentRoute = stack.length > 0 ? stack[stack.length - 1].route : '/';
      currentQueryParams = stack.length > 0 ? stack[stack.length - 1].queryParams : {};
      return { ...state, stack, currentRoute, currentQueryParams };
    default:
      return state;
  }
};
