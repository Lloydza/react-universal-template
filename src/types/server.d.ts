interface Metadata {
  site: string;
  title: string;
  description: string;
  keywords: string;
  og: {
    url: string;
    type: string;
  };
}

interface TemplateFunctionProps {
  app: string;
  preloadedState: ReduxState;
  options: {
    meta: Metadata;
    js: string[];
    css: string[];
  };
}
