import React, { memo } from 'react';
import { AppLoadingWrapper } from 'app/wrappers';
import HomePage from './page/index';

const WrappedHomePage = AppLoadingWrapper(HomePage);
const HomePageWrapper = (props) => {
  return <WrappedHomePage {...props} />;
};

export default memo(HomePageWrapper);
