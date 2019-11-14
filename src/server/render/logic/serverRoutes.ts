import { serverFetchData as dashboardFetch } from 'app/pages/DashboardPage';

export default [
  {
    path: '/dashboard',
    serverFetchData: dashboardFetch,
  },
];
