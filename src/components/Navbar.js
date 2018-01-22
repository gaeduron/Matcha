import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter';

const onSearch = () => history.replace('/dashboard');
const onProfile = () => history.replace('/profile/user-id');
const onChat = () => history.replace('/chat');
const onNews = () => history.replace('/news');

const navItemActive = (path) => {
	if (history.location.pathname === path) {
		return ' c-nav__item--active';
	}
	return '';
};

const itemLogoActive = (path) => {
	if (history.location.pathname === path) {
		return ' c-nav-item__logo--active';
	}
	return '';
};

const iconActive = (path) => {
	if (history.location.pathname === path) {
		return ' material-icons--active';
	}
	return '';
};

export const Navbar = () => (
	<header className="c-nav">

		<div className={`c-nav__item ${navItemActive('/dashboard')}`} onClick={onSearch}>
			<div className={`c-nav-item__logo ${itemLogoActive('/dashboard')}`}>
				<i className={`material-icons material-icons--big-white ${iconActive('/dashboard')}`}>
				search
				</i>
			</div>
			<h5 className="c-nav-item__text">search</h5>
		</div>

		<div className={`c-nav__item ${navItemActive('/profile/user-id')}`} onClick={onProfile}>
			<div className={`c-nav-item__logo ${itemLogoActive('/profile/user-id')}`}>
				<i className={`material-icons material-icons--big-white ${iconActive('/profile/user-id')}`}>
				face
				</i>
			</div>
			<h5 className="c-nav-item__text">profile</h5>
		</div>

		<div className={`c-nav__item ${navItemActive('/chat')}`} onClick={onChat}>
			<div className={`c-nav-item__logo ${itemLogoActive('/chat')}`}>
				<i className={`material-icons material-icons--big-white ${iconActive('/chat')}`}>
				chat_bubble_outline
				</i>
			</div>
			<h5 className="c-nav-item__text">chat</h5>
		</div>

		<div className={`c-nav__item ${navItemActive('/news')}`} onClick={onNews}>
			<div className={`c-nav-item__logo ${itemLogoActive('/news')}`}>
				<i className={`material-icons material-icons--big-white ${iconActive('/news')}`}>
				notifications_none
				</i>
			</div>
			<h5 className="c-nav-item__text">news</h5>
		</div>

		<div className="c-nav__item c-nav__item--opposite" onClick={startLogout}>
			<div className="c-nav-item__logo">
				<i className="material-icons material-icons--big-white">power_settings_new</i>
			</div>
			<h5 className="c-nav-item__text">logout</h5>
		</div>

	</header>
);

const mapDispatchToProps = () => ({
	startLogout: () => startLogout(),
});

export default connect(undefined, mapDispatchToProps)(Navbar);
