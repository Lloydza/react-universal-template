/**
 * Creates a bunch of redux action functions to be exported
 * @param {Array} actions The actions
 */
export const createReduxActions = (actions) => {
  if (!actions) {
    return null;
  }

  if (!Array.isArray(actions)) {
    return createReduxAction(actions);
  }

  return actions.map((action) => {
    return createReduxAction(action);
  });
};

const createReduxAction = (action) => {
  if (!action) {
    return null;
  }

  if (typeof action === 'string') {
    return () => {
      return {
        type: action,
      };
    };
  }

  return (...args) => {
    let actionObj = {
      type: action.type,
    };

    const { key, keys } = action;
    if (key && !keys) {
      const arg = args[0];
      actionObj[action.key] = arg;
    }

    if (keys) {
      const keyObjs = keys.reduce((currentKeys, item, index) => {
        const newKeys = { ...currentKeys };
        newKeys[item] = args[index];
        return newKeys;
      }, {});
      actionObj = { ...actionObj, ...keyObjs };
    }

    return actionObj;
  };
};
