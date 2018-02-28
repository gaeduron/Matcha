import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import { Header } from './Header';
import Menu from './menu';
import Chat from './Chat';
import UserDescription from './UserDescription.js';

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

export class ChatPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: 'hidden',
			description: 'visible',
		};
	}

	onShowMenu = () => {	
		const menu = 'visible';
		this.setState(() => ({ menu }));
	}
	
	onHideMenu = () => {	
		const menu = 'hidden';
		this.setState(() => ({ menu }));
	}

	onConversationChange = (profile) => this.setState({ profile });

	componentWillMount = () => {
		console.log('o');	
	}

	render() {
		return (
			<div className="l-flex-container">
				<div className="l-header">
					<Header
						menu={this.state.menu}
						showMenu={this.onShowMenu}
						hideMenu={this.onHideMenu}
						profile={this.state.profile}
					/>
				</div>
				<div className="l-nav"><Navbar /></div>
				<div
					className={`l-menu l-menu--slide-left c-menu c-menu--white c-menu--no-padding
						${this.state.menu === "visible" ? "" : "l-menu__show"}
					`}
				>
					<Menu
						matches={this.props.matches}
						showMenu={this.onShowMenu}
						onConversationChange={(profile) => this.onConversationChange(profile)}
					/>
				</div>
				<div className="l-main l-main__chat c-main c-main--white">
					<Chat />
					<div className={`l-chat__user-desc ${this.state.description == "hidden" ? "l-chat__hide-desc" : ""}`}>
						<UserDescription />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
		mathes: mockMatch,
		chatProfile: state.chat.chatProfile,
	};
};

export default connect(mapStateToProps, undefined)(ChatPage);
