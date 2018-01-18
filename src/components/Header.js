import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter';

const onProfile = () => history.push(`profile/user-id`);
const onNotifications = () => history.push(`notifications/`);
const onMessages = () => history.push(`messages/`);

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Matcha</h1>
        </Link>
        <button className="button button--link" onClick={onProfile}>Profile</button>
        <button className="button button--link" onClick={onNotifications}>Notifications</button>
        <button className="button button--link" onClick={onMessages}>Messages</button>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => startLogout()
});

export default connect(undefined, mapDispatchToProps)(Header);
