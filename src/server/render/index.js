import config from '../../config';

 import { matchPath } from 'react-router';

import renderHomePage from './home/index';
import renderOtherPage from './other/index';
import renderNotFoundPage from './notFound/index';

export default function handleRender(req, res) {
  var pathToMatch = req._parsedUrl.pathname;

  // Catch any request for static files
  var matchStyles = matchPath(pathToMatch, '/styles.css');
  var matchBundle = matchPath(pathToMatch, '/bundle.js');
  var matchFavIcon = matchPath(pathToMatch, '/favicon.ico');
  if ((matchStyles && matchStyles.isExact) || (matchBundle && matchBundle.isExact) || (matchFavIcon && matchFavIcon.isExact)) {
    res.sendStatus(200);
    return;
  }

  var matchOtherPage = matchPath(pathToMatch, '/other');
  if (matchOtherPage && matchOtherPage.isExact) {
    renderOtherPage(req, res);
    return;
  }

  var matchHomePage = matchPath(pathToMatch, '/');
  if (matchHomePage && matchHomePage.isExact) {
    renderHomePage(req, res);
    return;
  }

  // Catch-all
  renderNotFoundPage(req, res);
};