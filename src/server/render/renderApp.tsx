import Koa from 'koa';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { DOMAIN, DEFAULT_META } from 'utils/constants';
import RouteHandler from 'app/routeHandler/index';

// Renders the current page on the server, given the store, the template, etc
interface RenderAppProps {
  ctx: Koa.Context;
  clientStats: ClientStats;
  templateFunction: (props: TemplateFunctionProps) => string;
  store: Store;
}
export default function renderApp({ ctx, clientStats, templateFunction, store }: RenderAppProps): void {
  const history = createMemoryHistory({ initialEntries: [ctx.request.url] });

  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <RouteHandler history={history} />
    </Provider>,
  );

  const preloadedState = store.getState();
  const meta = buildMetadata(ctx, preloadedState);

  const { assetsByChunkName } = clientStats;
  const { vendor, main } = assetsByChunkName;
  const js = main.filter((item: string) => {
    return item.includes('.js');
  });
  const css = main.filter((item: string) => {
    return item.includes('.css');
  });
  js.push(vendor);

  const options = {
    meta,
    js,
    css,
  };

  ctx.body = templateFunction({ app, preloadedState, options });
}

const buildMetadata = (ctx: Koa.Context, state: ReduxState): Metadata => {
  const metadata = {
    site: DEFAULT_META.SITE,
    title: state.app.pageTitle,
    description: DEFAULT_META.DESCRIPTION,
    keywords: DEFAULT_META.KEYWORDS,
    og: {
      url: `${ctx.protocol}://${DOMAIN}${ctx.request.path}`,
      type: DEFAULT_META.OG_TYPE,
    },
  };

  return metadata;
};
