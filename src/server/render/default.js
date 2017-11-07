// Used to render most pages.
// You might use a different/custom render for certain pages if you wanted customized meta tags.
export default function renderDefaultPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>React Universal Template</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.envLevel = ${process.env.ENVIRONMENT_LEVEL || 1};
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
};