import DefaultLayout from 'app/layouts/defaultLayout';
import EmptyLayout from 'app/layouts/emptyLayout';

// Import the required layout dymically on the client.
const emptyLayoutRoutes = [];
export default (pathname) => {
  if (emptyLayoutRoutes.includes(pathname)) {
    return EmptyLayout;
  }

  return DefaultLayout;
};
