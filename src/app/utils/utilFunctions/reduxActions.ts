interface ActionCreator {
  type: string;
  key?: string;
  keys?: [string];
}

type ActionParam = string | ActionCreator;

/**
 * Creates a bunch of redux action functions to be exported
 * @param {Array} actions The actions
 */
export const createReduxActions = (...args: ActionParam[]): ((...args: any[]) => void)[] => {
  if (args.length === 0) {
    return null;
  }

  return args.map((action: ActionParam) => {
    return createReduxAction(action);
  });
};

const createReduxAction = (action: ActionParam): ((...args: any[]) => void) => {
  if (!action) {
    return null;
  }

  if (typeof action === 'string') {
    return (): ActionCreator => {
      return {
        type: action,
      };
    };
  }

  return (...args: any[]): ActionCreator => {
    let actionObj = {
      type: action.type,
    };

    const { key, keys } = action;
    if (key && !keys) {
      const arg = args[0];
      actionObj[action.key] = arg;
    }

    if (keys) {
      const keyObjs = keys.reduce((currentKeys: GenericObject, item: string, index: number): {} => {
        const newKeys = { ...currentKeys };
        newKeys[item] = args[index];
        return newKeys;
      }, {});
      actionObj = { ...actionObj, ...keyObjs };
    }

    return actionObj;
  };
};
