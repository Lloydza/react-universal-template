// Used to render most pages.
// You might use a different/custom render for certain pages if you wanted customized meta tags.
export default function renderDefaultPage(app, preloadedState, options) {
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