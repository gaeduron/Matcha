import React from 'react';


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

export const Header = () => (
	<header className="c-nav">

		<div className="c-nav__item c-nav__item--opposite" onClick={}>
			<div className="c-nav-item__logo">
				<i className="material-icons material-icons--big-white">power_settings_new</i>
			</div>
			<h5 className="c-nav-item__text">logout</h5>
		</div>

	</header>
);

export default Header;
