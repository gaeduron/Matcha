import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter';

const onSearch = () => history.push('search/');
const onProfile = () => history.push('profile/user-id');
const onChat = () => history.push('chat/');
const onNews = () => history.push('news/');

export const Navbar = () => (
	<header className="c-nav">
		<div className="c-nav__item" onClick={onSearch}>
			<div className="c-nav-item__logo c-nav-item__logo--active">
				<i className="material-icons material-icons--big-white material-icons--active">search</i>
			</div>
			<h5 className="c-nav-item__text">search</h5>
		</div>
		<div className="c-nav__item" onClick={onProfile}>
			<div className="c-nav-item__logo">
				<i className="material-icons material-icons--big-white">face</i>
			</div>
			<h5 className="c-nav-item__text">profile</h5>
		</div>
		<div className="c-nav__item" onClick={onChat}>
			<div className="c-nav-item__logo">
				<i className="material-icons material-icons--big-white">chat_bubble_outline</i>
			</div>
			<h5 className="c-nav-item__text">chat</h5>
		</div>
		<div className="c-nav__item" onClick={onNews}>
			<div className="c-nav-item__logo">
				<i className="material-icons material-icons--big-white">notifications_none</i>
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
