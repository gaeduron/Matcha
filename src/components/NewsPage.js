import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import Navbar from './Navbar';
import Notification from './NotificationList.js'
import uuid from 'uuid';
import { newsSelector } from '../selectors/interactions';


export class NewsPage extends React.Component {
	constructor(props) {
		super(props);
	};

	onNewsClick = (user) => {
		if (user.type === 'sent you a message') {
			history.push(`/chat`);
		} else {
			history.push(`/profile/${user.id}`);
		} 	
	};

	render() {
		
		const news = this.props.notif;
		const unseenNewsCount = news.filter(x => !x.clicked).length;

		return (
			<div className="l-flex-container">
				<div className="l-nav"><Navbar /></div>
				<div className="l-news-main">
					<div className="l-news">
						<h3 className="o-little-title o-little-title--light l-news-title">
							<p className="o-title-number l-news-title__number">
							{unseenNewsCount}
							</p>
							UNSEEN NOTIFICATION{news.length > 1 && 'S'}
						</h3>
						{news.map((user) => 
							<Notification
								data={user}
								key={uuid()}
								onNewsClick={() => this.onNewsClick(user)}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: newsSelector(state.interactions, state.user.id),
	}
};

export default connect(mapStateToProps, undefined)(NewsPage);



/* Mock news format */

//const mockNews = [
//	{
//		id: 528,
//		fname: 'Charley',
//		lname: 'Gleichner',
//		age: 27,
//		occupation: 'Application Programmers',
//		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518691639/myh986grrkvm9g6wzqqk.jpg',
//		connected: true,
//		clicked: false,
//		type: 'unliked your profile',
//		time: '2 minutes ago',
//		content: false,
//	},
//];
