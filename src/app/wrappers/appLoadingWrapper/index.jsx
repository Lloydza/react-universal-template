import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'app/components';

// This component wraps pages in a loading state for the app,
// to show a loader in a standardized way, and potentially handle errors etc
export default (Page) => {
  const AppLoadingWrapperComponent = (props) => {
    const { isAppLoading, isPageLoading } = props;

    if (isPageLoading || isAppLoading) {
      return <Loader />;
    }

    return <Page {...props} />;
  };

  AppLoadingWrapperComponent.propTypes = {
    isPageLoading: PropTypes.bool,
    isAppLoading: PropTypes.bool.isRequired,
  };

  AppLoadingWrapperComponent.defaultProps = {
    isPageLoading: false,
  };

  return memo(connect(mapStateToProps, null)(AppLoadingWrapperComponent));
};

const mapStateToProps = (state) => {
  return {
    isAppLoading: state.app.isLoading,
  };
};
