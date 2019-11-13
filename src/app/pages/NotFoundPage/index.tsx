import { connect } from 'react-redux';
import { manageChangeRoute } from 'app/store/actions';
import NotFoundPage from './notFoundPage';

const mapStateToProps = (state: ReduxState): GenericObject => {
  return {
    currentRoute: state.history.currentRoute,
  };
};

const mapDispatchToProps = {
  onManageChangeRoute: manageChangeRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);
