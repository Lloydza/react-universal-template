import { AppLoadingWrapper } from 'app/wrappers';
import { connect } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import DashboardPage from './dashboardPage';

const mapStateToProps = (state: ReduxState): GenericObject => {
  return {
    currentRoute: state.history.currentRoute,
  };
};

const mapDispatchToProps = {
  onManageChangeRoute: manageChangeRoute,
};

export default AppLoadingWrapper(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
