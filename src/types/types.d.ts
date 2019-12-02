declare module '*.css';
declare let ENVIRONMENT_LEVEL: string;
declare let IS_LOCAL: boolean;

interface User {
  userId: string;
  [key: string]: any;
}

interface GenericObject {
  [key: string]: any;
}

interface ClientStats {
  assetsByChunkName: {
    vendor: string;
    main: string[];
  };
}

declare namespace NodeJS {
  interface Global {
    fetch?: (...args: any[]) => any;
    window: {
      envLevel?: number;
      isLocal?: boolean;
      [key: string]: any;
      PRELOADED___STATE?: ReduxState;
    };
    navigator: {
      [key: string]: any;
    };
    env: {
      envLevel: number;
      isLocal: boolean;
      jwtSecret: string;
      staticUrl: string;
    };
  }
}

type PromiseParam = (value?: any) => void;
type ClickFunction = (e?: GenericObject) => void;
