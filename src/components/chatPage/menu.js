import React from 'react';
import { connect } from 'react-redux';
import UserStatus from '../profilePage/UserStatus';

const mockMatch = [
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
	}
	
	onSort = () => this.props.showMenu();

	render() {
		return (
			<div className="c-menu__wrapper">
				<div className="c-menu__search-bar-box">
					<h2 className="o-little-title c-menu__search-bar-title">MATCHES</h2>
					<div>
						<input className="c-menu__search-bar" type="text" placeholder="Search">
						</input>
						<i className="material-icons c-menu__search-bar-icon">search</i>
					</div>
				</div>
				{this.props.matches.map((user) => (
					<UserStatus
						data={user}
						showProfile={this.onSort}
						key={user.id}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		matches: mockMatch,
	};
};

export default connect(mapStateToProps, undefined)(SearchMenu);
