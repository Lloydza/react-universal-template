import React from 'react';
import { AppLoadingWrapper } from 'app/wrappers';
import DashboardPage from './page/index';

const WrappedDashboardPage = AppLoadingWrapper(DashboardPage);
class DashboardPageWrapper extends React.PureComponent {
  // Called server-side only.
  // This function must return true if the data is found for the page, and it should load.
  // Can do stuff like dispatch thunk actions which call the network layer to fetch data,
  // then update the store or and evaluate if its correct.
  static fetchData = async (store, options) => {
    return true;
  };

  render() {
    return <WrappedDashboardPage {...this.props} />;
  }
}

export default DashboardPageWrapper;
