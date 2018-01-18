import React from 'react';
import Navbar from './Navbar';

const DashboardPage = () => (
	<div className="l-flex-container">
		<div className="l-nav"><Navbar /></div>
		<div className="l-menu c-menu">MENU</div>
		<div className="l-main c-main">CHAT</div>
		<div className="l-menu c-menu">CONTACT PROFILE</div>
	</div>
);

export default DashboardPage;
