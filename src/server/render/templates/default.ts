import env from 'server/env';

// Used to render most pages.
// You might use a different/custom render for certain pages if you wanted customized meta tags.
// options could also potentially contain data for things like meta tags
export default function renderDefaultPage({ app, preloadedState, options }: TemplateFunctionProps): string {
  const { meta, css, js } = options;

  const styles = css.reduce((cssString: string, item: string) => {
    return `${cssString}<link rel="stylesheet" type="text/css" href="/${item}">`;
  }, '');

  const scripts = js.reduce((jsString: string, item: string) => {
    return `${jsString}<script src="/${item}"></script>`;
  }, '');

  return `
    <!doctype html>
    <html>
      <head>
        <!-- The first thing in any HTML file should be the charset -->
        <meta charset="utf-8">

        <!-- Make the page mobile compatible -->
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta name="mobile-web-app-capable" content="yes">

        <link rel="icon" href="/favicon.ico">

        <!-- iOS home screen icons and app banner -->
        <meta name="apple-itunes-app" content="app-id=1286662781">
        <meta name="apple-mobile-web-app-title" content="${meta.site}">
        <link rel="apple-touch-icon" href="${env.staticUrl}/icon-256.png">
        <link rel="apple-touch-icon" href="${env.staticUrl}/icon-180.png" size="180x180">
        <link rel="apple-touch-startup-image" href="${env.staticUrl}/icon-256.png">

        <!-- MS icons -->
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="${env.staticUrl}/icon-144.png">
        <meta name="theme-color" content="#ffffff">

        <!-- Not sure if needed
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
        <meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="0">
        -->

        <!-- General Metadata -->
        <title>${meta.title}</title>
        <meta name="title" content="${meta.title}">
        <meta name="description" content="${meta.description}">
        <meta name="keyword" content="${meta.keywords}">
        <meta name="robots" content="index, follow">

        <!-- Open Graph tags -->
        <meta property="og:site_name" content="${meta.site}">
        <meta property="og:url" content="${meta.og.url}">
        <meta property="og:type" content="${meta.og.type}">
        <meta property="og:title" content="${meta.title}">
        <meta property="og:description" content="${meta.description}">
        <meta property="og:image:alt" content="${meta.title}">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Raleway:700" rel="stylesheet">

        ${styles}
      </head>

      <body>
        <!-- Display a message if JS has been disabled on the browser. -->
        <noscript>If you're seeing this message, that means <strong>JavaScript has been disabled on your browser</strong>, please <strong>enable JS</strong> to make this app work.</noscript>

        <div id="root">${app}</div>
        <script>
          window.envLevel = ${env.envLevel};
          window.isLocal = ${env.isLocal};
          window.PRELOADED___STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')};
        </script>
        ${scripts}
      </body>
    </html>
    `;
}
