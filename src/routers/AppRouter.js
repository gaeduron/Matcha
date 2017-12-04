import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import Onboarding from '../components/onboarding/Onboarding';
import PasswordResetPage from '../components/PasswordResetPage';
import Notifications from '../components/Notification';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// dummy data
import FBData from '../components/Onboarding/FBData.js'; 

export const history = createHistory();

const AppRouter = () => (
	<div>
		<Router history={history}>
			<div>
				<Notifications />
				<Switch>
					<PublicRoute path="/onboarding" component={() => <Onboarding FBData={FBData} />} exact={true} />
					<PublicRoute path="/" component={LoginPage} exact={true} />
					<PublicRoute path="/password-reset/:token" component={PasswordResetPage} />
					<PrivateRoute path="/dashboard" component={DashboardPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	</div>
);

export default AppRouter;
