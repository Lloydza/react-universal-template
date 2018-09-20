// import { matchPath } from 'react-router';

// Render function
import renderApp from './renderApp';

// Templates (Pages)
import renderDefaultPage from './templates/default';

export default ({ clientStats }) => {
  return (req, res) => {
    const routePath = req._parsedUrl.pathname; // eslint-disable-line no-underscore-dangle

    // Create the redux store
    const initialState = { session: { hasLoaded: true, initialRoute: routePath } };

    /*
  // You might want to change some redux store values or call some async await
  // data-fetch depeding on the route and query parameters
  // Example:
  const matchProfile = matchPath(pathToMatch, '/profiles/:userId');
  if (
    matchProfile && matchProfile.isExact &&
    utilities.checkIfParamIsInt(matchProfile.params.userId)) {
    initialState.session.userId = matchProfile.params.userId;
    initialState.someOtherValue = req.query.someQueryVal

    // potentially call something like renderProfilePage() here, which
    // could be different to the default renderDefaultPage() template
    // Example:
    renderApp(renderProfilePage, {
      initialState: initialState,
      options: { userName: req.query.userName } }
    );

    // Return if not wanting to render the default template and
    // use the template as in example above
    // (i.e: not hit the renderApp() call below)
    return;
  }
  */

    renderApp(req, res, clientStats, renderDefaultPage, { initialState });
  };
};
