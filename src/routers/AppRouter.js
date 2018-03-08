import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/searchPage/page';
import ProfilePage from '../components/profilePage/page';
import ChatPage from '../components/chatPage/page';
import NewsPage from '../components/NewsPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import Onboarding from '../components/onboarding/Onboarding';
import PasswordResetPage from '../components/PasswordResetPage';
import FacebookCallback from '../components/facebookCallback';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// dummy data
import FBData from '../components/onboarding/FBData.js'; 

export const history = createHistory();

const AppRouter = () => (
	<div>
		<Router history={history}>
			<div>
				<Switch>
					<PrivateRoute path="/onboarding" component={() => <Onboarding/>} exact={true} />
					<PublicRoute path="/" component={LoginPage} exact={true} />
					<PublicRoute path="/password-reset/:token" component={PasswordResetPage} />
					<PublicRoute path="/auth/facebook/callback/:sessionToken" component={FacebookCallback} />
					<PrivateRoute path="/dashboard" component={DashboardPage} />
					<PrivateRoute path="/profile/:uid" component={ProfilePage} />
					<PrivateRoute path="/edit-profile/:uid" component={(props) => (<ProfilePage edit match={props.match} />)} />
					<PrivateRoute path="/chat" component={ChatPage} />
					<PrivateRoute path="/news" component={NewsPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	</div>
);

export default AppRouter;
