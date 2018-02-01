import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  isOnboarding,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => {
		if (!!isAuthenticated) {
			if (!isOnboarding || props.match.url === "/onboarding") {
				return (			
					<div>
					  <Component {...props} />
					</div>
				);	
			} else {
				return (<Redirect to="/onboarding" />);
			}
		} else { 
			return (<Redirect to="/" />);
		}
	}} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.uid,
  isOnboarding: state.auth.isOnboarding
});

export default connect(mapStateToProps)(PrivateRoute);
