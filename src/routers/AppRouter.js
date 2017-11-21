import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouterComponent = (props) => (
	<div>
		<Router history={history}>
			<div>
				<Switch>
					<PublicRoute path="/" component={LoginPage} exact={true} />
					<PrivateRoute path="/dashboard" component={DashboardPage} />
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		</Router>
	</div>
);

const mapStateToProps = state => {
	return {
		notif: state.notif.notification
	}
}

const AppRouter = connect( mapStateToProps, undefined )(AppRouterComponent)

export default AppRouter;
