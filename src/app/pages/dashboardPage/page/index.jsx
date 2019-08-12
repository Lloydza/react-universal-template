import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'app/components';
import { manageChangeRoute } from 'app/store/actions';
import styles from './styles.scss';

const DashboardPage = (props) => {
  const { currentRoute, onChangeRoute } = props;

  const handleGoToHomePage = (e) => {
    e.preventDefault();
    onChangeRoute('/');
  };

  return (
    <div className={styles.container}>
      <div>This is the Dashboard Page</div>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <Button text="Go to the home page." onClick={handleGoToHomePage} />
    </div>
  );
};

DashboardPage.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  onChangeRoute: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentRoute: state.history.currentRoute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeRoute: (route) => {
      dispatch(manageChangeRoute(route));
    },
  };
};

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DashboardPage),
);
