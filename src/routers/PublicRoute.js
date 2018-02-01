import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  isAuthenticated,
  isOnboarding,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      !!isAuthenticated ? (
        <Redirect to={isOnboarding ? '/onboarding' : '/dashboard'} />
      ) : (
          <Component {...props} />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.uid,
  isOnboarding: state.auth.isOnboarding
});

export default connect(mapStateToProps)(PublicRoute);
