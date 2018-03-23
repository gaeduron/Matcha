import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { history } from '../routers/AppRouter.js';
import { newsBadgesSelector, messagesBadgesSelector } from '../selectors/interactions';

const onSearch = () => history.push('/dashboard');
const onProfile = (id) => history.push(`/profile/${id}`);
const onChat = () => history.push('/chat');
const onNews = () => history.push('/news');

const navItemActive = (path, altPath = false) => {
	if (history.location.pathname === path || history.location.pathname === altPath) {
		return ' c-nav__item--active';
	}
	return '';
};

const itemLogoActive = (path, altPath = false) => {
	if (history.location.pathname === path || history.location.pathname === altPath) {
		return ' c-nav-item__logo--active element-animation-colorize';
	}
	return '';
};

const iconActive = (path, altPath = false) => {
	if (history.location.pathname === path || history.location.pathname === altPath) {
		return ' material-icons--active';
	}
	return '';
};

const formatCount = (count) => count > 9 ? "9+" : count;

export const Navbar = ({ userID, search, newsBadges, messagesBadges }) => {
	const notificationCount = formatCount(5);

	let profile = false;
	if ('profile' in search) {
		profile = search.profile.id;		
	}
	return (
	<header className="c-nav">

		<div className={`c-nav__item ${navItemActive('/dashboard', `/profile/${profile}`)}`} onClick={onSearch}>
			<div className={`c-nav-item__logo ${itemLogoActive('/dashboard', `/profile/${profile}`)}`}>
				<i className={`material-icons material-icons--big-white ${iconActive('/dashboard', `/profile/${profile}`)}`}>
				search
				</i>
			</div>
			<h5 className="c-nav-item__text">search</h5>
		</div>

		<div
			className={`c-nav__item
				${navItemActive(`/profile/${userID}`, `/edit-profile/${userID}`)}
			`}
			onClick={() => onProfile(userID)}
		>
			<div className={`c-nav-item__logo
					${itemLogoActive(`/profile/${userID}`, `/edit-profile/${userID}` )}
				`}
			>
				<i className={`material-icons material-icons--big-white 
						${iconActive(`/profile/${userID}`, `/edit-profile/${userID}`)}
					`}
				>
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
				<div className={`c-news-pastille 
					${messagesBadges && history.location.pathname !== '/chat' ? '' : 'display-none'}
				`}>
					{formatCount(messagesBadges)}
				</div>
			</div>
			<h5 className="c-nav-item__text">chat</h5>
		</div>

		<div className={`c-nav__item ${navItemActive('/news')}`} onClick={onNews}>
			<div className={`c-nav-item__logo ${itemLogoActive('/news')}`}>
				<i className={`material-icons material-icons--big-white ${iconActive('/news')}`}>
				notifications_none
				</i>
				<div className={`c-news-pastille 
					${newsBadges && history.location.pathname !== '/news' ? '' : 'display-none'}
				`}>
					{formatCount(newsBadges)}
				</div>
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
)};

const mapStateToProps = (state) => ({
	userID: state.user.id,
	search: state.search,
	newsBadges: newsBadgesSelector(state.interactions, state.user.id),
	messagesBadges: messagesBadgesSelector(state.interactions, state.user.id)
	
});

export default connect(mapStateToProps, undefined)(Navbar);
