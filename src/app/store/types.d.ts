interface ReduxAction {
  type: string;
  [key: string]: any;
}

interface AppState {
  isLoading: boolean;
  isPageNotFound: boolean;
  pageTitle: string;
}

interface HistoryState {
  stack: {
    route: string;
    queryParams: GenericObject;
  }[];
  currentRoute: string;
  currentQueryParams: {
    [key: string]: any;
  };
}

interface SessionState {
  user: {
    [key: string]: any;
  };
  accessToken: string;
  refreshToken: string;
}

interface ReduxState {
  app: AppState;
  history: HistoryState;
  session: SessionState;
}

type Dispatch = (...args: any[]) => any;
type GetState = () => ReduxState;
