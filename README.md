# react-universal-template
A React+Node template for building react universal websites. It is actually a working example with a skeleton framework in place (a couple pages, a few css classes, redux, etc). The goal here is to get a performant **server-side rendered** (universal) single page web app template that you can copy and paste to hit the ground running on a new project. It assumes you have a basic understanding of [react](https://reactjs.org/), [node](https://nodejs.org/en/), and [webpack](https://webpack.js.org/concepts/).

### TO RUN:

1. "npm run dev" (for develop)
2. "npm start" (for prod)

You can now access localhost on port 3002 (for develop)

## What else is included in this template:
1. [**Server Compression**](https://github.com/expressjs/compression): Critical to make sure that your bundle & css files are zipped before being sent down. Browsers will automatically unzip these once recieved.
2. [**partial loading**](https://github.com/faceyspacey/react-universal-component) Files are loaded asyncronously after first load as opposed to all at once (important for SEO and performance).
3. [**code splitting**](https://webpack.js.org/guides/code-splitting/): Currently the app and vendor bundles have been split in this template (app being custom code and vendor being all included node_modules). This could be taken further though, if your node_modules grows you might want to split vendor again (for example).
4. [**preact**](https://github.com/developit/preact) **and** [**preact-compat**](https://github.com/developit/preact-compat): One of the biggest concerns with web apps is package/bundle size. Preact with preact-compat is one way to significantly reduce this size. It's basically a lightweight module for React, containing 99% of its features, and is well supported/kept up-to-date. The "alias" tag in the client configs essentially indicates to web-pack that wherever it sees "react" and "react-dom", replace this with "preact-compat".
5. [**css modules**](https://github.com/css-modules/css-modules): CSS modules enable you to write scoped css for each component.
6. [**uglify JS**](https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) **and** [**uglify CSS**](https://github.com/NMFR/optimize-css-assets-webpack-plugin): To make sure all code is minified, also contributing to package size.
7. [**babel-polyfill**](https://babeljs.io/docs/usage/polyfill/): For browsers without full ES2015+ support.
8. [**isomporphic-fetch**](https://github.com/matthew-andrews/isomorphic-fetch): So that the server build does not break at compilation when it encounters a fetch() command.