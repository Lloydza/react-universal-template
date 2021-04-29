import { FunctionComponent } from 'react';
import DefaultLayout from 'app/layouts/defaultLayout';
import EmptyLayout from 'app/layouts/emptyLayout';

// Import the required layout dymically on the client.
const emptyLayoutRoutes = [];
export default (pathname: string): FunctionComponent => {
  if (emptyLayoutRoutes.includes(pathname)) {
    return EmptyLayout;
  }

  return DefaultLayout;
};
