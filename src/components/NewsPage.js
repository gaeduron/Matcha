import React from 'react';
import Navbar from './Navbar';
import Notifications from './NotificationList.js'

const DashboardPage = () => (
	<div className="l-flex-container">
		<div className="l-nav"><Navbar /></div>
		<div className="l-news-main">
			<div className="l-news">
				<h3 className="o-little-title o-little-title--light l-news-title">
					<p className="o-title-number l-news-title__number">2</p>UNSEEN NOTIFICATIONS
				</h3>
				<Notifications />
			</div>
		</div>
	</div>
);

export default DashboardPage;
