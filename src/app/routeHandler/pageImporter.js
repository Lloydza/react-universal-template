import { matchPath } from 'react-router';

import HomePage from 'app/pages/homePage/index';
import DashboardPage from 'app/pages/dashboardPage/index';
import NotFoundPage from 'app/pages/notFoundPage/index';

// Import the required page.
// Note that this function breaks the mold somewhat, as it updates
// a parameter prop ("pageParams"). This is done because mathPath() is
// the most effective way to pull out URL parameters to be saved.
export default (pathname, isPageNotFound) => {
  const pageParams = { pageName: pathname };

  if (isPageNotFound) {
    return { Page: NotFoundPage, pageParams };
  }

  let matchPage = null;

  matchPage = matchPath(pathname, '/');
  if (matchPage && matchPage.isExact) {
    return { Page: HomePage, pageParams };
  }

  matchPage = matchPath(pathname, '/dashboard');
  if (matchPage && matchPage.isExact) {
    return { Page: DashboardPage, pageParams };
  }

  return { Page: NotFoundPage, pageParams };
};
