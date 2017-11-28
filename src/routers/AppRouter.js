import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import Onboarding from '../components/onboarding/Onboarding';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// dummy data
import FBData from '../components/Onboarding/FBData.js'; 

export const history = createHistory();

const AppRouter = () => (
	<div>
		<Router history={history}>
			<div>
				<Switch>
					{/* Put back \ = LoginPage --> */}
					<PublicRoute path="/" component={() => <Onboarding FBData={FBData} />} exact={true} />
					<PrivateRoute path="/dashboard" component={DashboardPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	</div>
);

export default AppRouter;
