// Used to render most pages.
// You might use a different/custom render for certain pages if you wanted customized meta tags.
// The options variable might contain data needed for something like meta tags, but not needed for actual app
export default function renderDefaultPage(app, preloadedState, options) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>React Universal Template</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

        <link rel="stylesheet" type="text/css" href="styles.css">
      </head>
      <body>
        <div id="root">${app}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
    `
};