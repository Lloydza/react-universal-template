import { FunctionComponent } from 'react';
import { matchPath } from 'react-router';

import HomePage from 'app/pages/HomePage';
import DashboardPage from 'app/pages/DashboardPage';
import NotFoundPage from 'app/pages/NotFoundPage';

// Import the required page.
// Note that this function breaks the mold somewhat, as it updates
// a parameter prop ("pageParams"). This is done because mathPath() is
// the most effective way to pull out URL parameters to be saved.
interface PageParams {
  pageName: string;
  [key: string]: any;
}
interface PageImporterProps {
  pathname: string;
  isPageNotFound: boolean;
}
interface PageImporterReturn {
  Page: FunctionComponent<GenericObject>;
  pageParams: PageParams;
}
const pageImporter = ({ pathname, isPageNotFound }: PageImporterProps): PageImporterReturn => {
  const pageParams = { pageName: pathname } as PageParams;

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

export default pageImporter;
