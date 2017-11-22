import { matchPath } from 'react-router';

import renderHomePage from './home/index';
import renderNotFoundPage from './notFound/index';
import renderOtherPage from './other/index';

export default ({ clientStats }) => (req, res) => {
  var pathToMatch = req._parsedUrl.pathname;

  var matchHomePage = matchPath(pathToMatch, '/');
  if (matchHomePage && matchHomePage.isExact) {
    renderHomePage(req, res, clientStats);
    return;
  }

  var matchOtherPage = matchPath(pathToMatch, '/other');
  if (matchOtherPage && matchOtherPage.isExact) {
    renderOtherPage(req, res, clientStats);
    return;
  }

  renderNotFoundPage(req, res, clientStats);
};