import renderApp from '../renderApp';

export default function renderOtherPage(req, res, clientStats) {
  // ---> Any fetch and server logic would go here <---
  const initialState = { session: { serverPage: "other" } };
  renderApp(req, res, clientStats, initialState, renderPage);
};

// Sample customized render page where you could have specific meta tags
function renderPage(app, preloadedState, options) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>React Universal Template</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        ${options.styles}
      </head>
      <body>
        <div id="root">${app}</div>
        ${options.cssHash}
        ${options.js}
        <script>
          window.envLevel = ${process.env.ENVIRONMENT_LEVEL || 1};
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        </script>
      </body>
    </html>
    `
};