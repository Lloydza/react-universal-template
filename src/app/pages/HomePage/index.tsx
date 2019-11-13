import { AppLoadingWrapper } from 'app/wrappers';
import { connect } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import HomePage from './homePage';

const mapStateToProps = (state: ReduxState): GenericObject => {
  return {
    currentRoute: state.history.currentRoute,
  };
};

const mapDispatchToProps = {
  manageChangeRoute,
};

export default AppLoadingWrapper(connect(mapStateToProps, mapDispatchToProps)(HomePage));
