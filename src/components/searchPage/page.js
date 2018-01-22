import React from 'react';
import Navbar from '../Navbar';
import UserCard from './card';

const DashboardPage = () => (
	<div className="l-flex-container">
		<div className="l-nav"><Navbar /></div>
		<div className="l-menu c-menu">MENU</div>
		<div className="l-main c-main">
			<UserCard />
		</div>
	</div>
);

export default DashboardPage;
