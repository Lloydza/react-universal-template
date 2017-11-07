import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HandleStart from './other/handleStart';

// Pages
import Home from './components/home/index';
import Other from './components/other/index';
import NotFound from './components/notFound/index';

export default (
	<div>
		<HandleStart />
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/other" component={Other} />
			<Route path="*" component={NotFound} />
		</Switch>
    </div>
);