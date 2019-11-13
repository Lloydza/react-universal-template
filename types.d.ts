declare module '*.scss';
declare let ENVIRONMENT_LEVEL: number;
declare let IS_LOCAL: boolean;

interface GenericObject {
  [key: string]: any;
}

type PromiseParam = (value?: any) => void;
type ClickFunction = (e?: GenericObject) => void;
