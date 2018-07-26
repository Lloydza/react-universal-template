import { matchPath } from 'react-router';

// Render function
import renderApp from './renderApp';

// Templates (Pages)
import renderDefaultPage from './templates/default';

export default ({ clientStats }) => (req, res) => {
  let routePath = req._parsedUrl.pathname;

  // Create the redux store
  let initialState = { session: { hasLoaded: true,  initialRoute: routePath } };

  /*
  // You might want to change some redux store values or call some async await data-fetch depeding on the route and query parameters
  // Example:
  const matchProfile = matchPath(pathToMatch, '/profiles/:userId');
  if (matchProfile && matchProfile.isExact && utilities.checkIfParamIsInt(matchProfile.params.userId)) {
    initialState.session.userId = matchProfile.params.userId;
    initialState.someOtherValue = req.query.someQueryVal

    // potentially call something like renderProfilePage() here, which could be different to the default renderDefaultPage() template
    // Example:
    renderApp(renderProfilePage, { initialState: initialState, options: { userName: req.query.userName } });
    return; // Return if not wanting to render the default template and use the template as in example above
  }
  */

  renderApp(req, res, clientStats, renderDefaultPage, { initialState: initialState });
};
