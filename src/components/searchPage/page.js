import React from 'react';
import Navbar from '../Navbar';
import UserCard from './card';

const DashboardPage = () => (
	<div className="l-flex-container">
		<div className="l-nav"><Navbar /></div>
		<div className="l-menu c-menu">MENU</div>
		<div className="l-main l-main__search c-main">
			<div>
				<p className="o-title-menu l-title-menu l-cards l-title-menu">321 results nearby</p>
				<UserCard />
			</div>
		</div>
	</div>
);

export default DashboardPage;
