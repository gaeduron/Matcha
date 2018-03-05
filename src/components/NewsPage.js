import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import Navbar from './Navbar';
import Notification from './NotificationList.js'
import uuid from 'uuid';

import age from 's-age';
import ago from 's-ago';

const newsSelector = ({ visits, likes, onlineUsers }, id) => {

	const LIKE = 'liked your profile',
		UNLIKE = 'unliked your profile',
		VISIT = 'visited your profile';
	let news = [];
		
	likes.forEach(x => { 
		if (x.receiver == id)
			news.push({
				id: x.sender,
				fname: x.firstname,
				lname: x.lastname,
				age: age(x.birthdate),
				occupation: x.occupation,
				photo: JSON.parse(x.photos)[0], 
				connected: onlineUsers.includes(x.sender),
				clicked: x.clicked,
				type: x.unliked == true ? UNLIKE : LIKE ,
				time: ago(new Date(x.created_at)),
				created_at: x.created_at,
				content: false,
			});
	});

	visits.forEach(x => { 
		if (x.receiver == id)
			news.push({
				id: x.sender,
				fname: x.firstname,
				lname: x.lastname,
				age: age(x.birthdate),
				occupation: x.occupation,
				photo: JSON.parse(x.photos)[0], 
				connected: onlineUsers.includes(x.sender),
				clicked: x.clicked,
				type: VISIT,
				time: ago(new Date(x.created_at)),
				created_at: new Date(x.created_at).getTime(),
				content: false,
			});
	});

	news.sort((a, b) => a.created_at - b.created_at);

	return news;
};


const mockNews = [
	{
		id: 528,
		fname: 'Charley',
		lname: 'Gleichner',
		age: 27,
		occupation: 'Application Programmers',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518691639/myh986grrkvm9g6wzqqk.jpg',
		connected: true,
		clicked: false,
		type: 'unliked your profile',
		time: '2 minutes ago',
		content: false,
	},
	{
		id: 529,
		fname: 'Cristopher',
		lname: 'Hessel',
		age: 23,
		occupation: 'Concreter',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518692094/nwqsdyxpp7k1wyw08ihm.jpg',
		connected: false,
		clicked: false,
		type: 'sent you a message',
		time: '5 minutes ago',
		content: 'See you later, I have my yoga class !',
	},
	{
		id: 529,
		fname: 'Cristopher',
		lname: 'Hessel',
		age: 23,
		occupation: 'Concreter',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518692094/nwqsdyxpp7k1wyw08ihm.jpg',
		connected: false,
		clicked: true,
		type: 'liked your profile',
		time: '2 hours ago',
		content: false,
	},
	{
		id: 529,
		fname: 'Cristopher',
		lname: 'Hessel',
		age: 23,
		occupation: 'Concreter',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518692094/nwqsdyxpp7k1wyw08ihm.jpg',
		connected: false,
		clicked: true,
		type: 'visited your profile',
		time: 'February 24, 16:37',
		content: false,
	},
];

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

		/* Debug */
		//		console.log(this.props.notif);
		
		const news = this.props.notif;
		return (
			<div className="l-flex-container">
				<div className="l-nav"><Navbar /></div>
				<div className="l-news-main">
					<div className="l-news">
						<h3 className="o-little-title o-little-title--light l-news-title">
							<p className="o-title-number l-news-title__number">
							{mockNews.length}
							</p>
							UNSEEN NOTIFICATION{mockNews.length > 1 && 'S'}
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
