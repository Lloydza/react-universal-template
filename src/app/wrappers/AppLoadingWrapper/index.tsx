import React, { FunctionComponent, memo } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'app/components';

// This component wraps pages in a loading state for the app,
// to show a loader in a standardized way, and potentially handle errors etc
const AppLoadingWrapper = (Page: FunctionComponent): FunctionComponent => {
  const AppLoadingWrapperComponent = (props: GenericObject): JSX.Element => {
    const { isAppLoading, isPageLoading } = props;

    if (isPageLoading || isAppLoading) {
      return <Loader />;
    }

    return <Page {...props} />;
  };

  return memo(connect(mapStateToProps, null)(AppLoadingWrapperComponent));
};

const mapStateToProps = (state: ReduxState): GenericObject => {
  return {
    isAppLoading: state.app.isLoading,
  };
};

export default AppLoadingWrapper;
