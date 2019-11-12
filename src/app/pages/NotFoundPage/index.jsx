import React, { memo, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'app/components';
import { manageChangeRoute } from 'app/store/actions';
import styles from './styles.scss';

const NotFoundPage = ({ currentRoute, onChangeRoute }) => {
  const handleGoToHomePage = useCallback(
    (e) => {
      e.preventDefault();
      onChangeRoute('/');
    },
    [onChangeRoute],
  );

  return (
    <div className={styles.container}>
      <h1>Oops! We couldn&apos;t find the page you are looking for.</h1>
      <div>
        <h3>{`Current route: ${currentRoute}`}</h3>
      </div>
      <Button text="Go to the home page." onClick={handleGoToHomePage} />
    </div>
  );
};

NotFoundPage.propTypes = {
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

export default memo(connect(mapStateToProps, mapDispatchToProps)(NotFoundPage));
