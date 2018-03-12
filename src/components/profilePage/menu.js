import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../routers/AppRouter';
import UserStatus from './UserStatus';
import { likesSelector, visitsSelector } from '../../selectors/interactions';

const mockVisit = [
	{
		id: 530,
		fname: 'Zackary',
		lname: 'Kassulke',
		age: 30,
		occupation: 'Insurance Consultant',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518692534/gqdykhcszr8mmmepqwv6.jpg',
		connected: true,
		clicked: false,
	},
	{
		id: 527,
		fname: 'Bill',
		lname: 'Becker',
		age: 32,
		occupation: 'Waterside Worker',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518690862/yasxzl2kl4jip1k65b4t.jpg',
		connected: false,
		clicked: false,
	},
	{
		id: 528,
		fname: 'Charley',
		lname: 'Gleichner',
		age: 27,
		occupation: 'Applications Programmers',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518691639/myh986grrkvm9g6wzqqk.jpg',
		connected: true,
		clicked: true,
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
	},
];

const mockLike = [
	{
		id: 527,
		fname: 'Bill',
		lname: 'Becker',
		age: 32,
		occupation: 'Waterside Worker',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518690862/yasxzl2kl4jip1k65b4t.jpg',
		connected: false,
		clicked: false,
	},
	{
		id: 528,
		fname: 'Charley',
		lname: 'Gleichner',
		age: 27,
		occupation: 'Applications Programmers',
		photo: 'https://res.cloudinary.com/matcha/image/upload/v1518691639/myh986grrkvm9g6wzqqk.jpg',
		connected: true,
		clicked: true,
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
	},
];

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = { page: "Likes" };
	}

	onPageLikes = () => this.setState({ page: "Likes" });
	onPageVisits = () => this.setState({ page: "Visits" });
	onUserClick = (id) => history.push(`/profile/${id}`);
	
	render() {
		if (this.state.page === 'Likes') {
			return (
				<div className="c-menu__wrapper">
					<div>
						<h2
							className={`c-menu__page`}
							onClick={this.onPageLikes}
						>
							Likes
						</h2>
						<h2
							className={ `c-menu__page c-menu__page--hidden`}
							onClick={this.onPageVisits}
						>
							Visits
						</h2>
					</div>
					{this.props.likes.map((user) => (
						<UserStatus
							data={user}
							showProfile={() => this.onUserClick(user.id)}
							key={user.id}
						/>
					))}
				</div>
			)
		} else {
			return (
				<div className="c-menu__wrapper">
					<div>
						<h2
							className={`c-menu__page c-menu__page--hidden`}
							onClick={this.onPageLikes}
						>
							Likes
						</h2>
						<h2
							className={ `c-menu__page`}
							onClick={this.onPageVisits}
						>
							Visits
						</h2>
					</div>
					{this.props.visites.map((user) => (
						<UserStatus
							data={user}
							showProfile={() => this.onUserClick(user.id)}
							key={user.id}
						/>
					))}
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		likes: likesSelector(state.interactions, state.user.id),
		visites: visitsSelector(state.interactions, state.user.id),
	};
};

export default connect(mapStateToProps, undefined)(SearchMenu);
