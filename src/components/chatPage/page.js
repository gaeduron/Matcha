import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import { Header } from './Header';
import Menu from './menu';
import Chat from './Chat';
import UserDescription from './UserDescription2.js';
import { updateChatProfile } from '../../actions/chat';
import { matchSelector, messagesSelector } from '../../selectors/interactions';

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
        occupation: 'Yeah don\'t forget my favorite color is blue ciel',
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

const mockMessages = {
	0: [{time: "2018-01-28T14:30:11.202Z", from: "you", text: "____________"}],
	60: [
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
		],
	528: [
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
		],
	529: [
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
			{time: "2018-01-28T14:30:11.202Z", from: "you", text: "Hey, how are you ?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Fine and you?"},
			{time: "2018-01-28T14:31:11.202Z", from: "paola", text: "Do you come here often?"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
			{time: "2018-01-28T14:32:11.202Z", from: "paola", text: "Me too, seem like the place too be ;)"},
			{time: "2018-01-28T14:32:11.202Z", from: "you", text: "Are you from paris, or are you traveling ?"},
			{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},
		],
}


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

	onConversationChange = (profile) => this.props.updateChatProfile(profile);

	componentWillMount = () => {
		if (this.props.chatProfile.id === 0 && this.props.matches.length) {
			this.props.updateChatProfile(this.props.matches[0]);
		} else {
			this.onShowMenu();
		}
	}

	getProfileMessages = id => this.props.messages[id];

	onSendMessage = (message) => {
			
		alert(`chatPage/page:158: message: ${message}`);
	};

	render() {
			console.log('truc :', this.props.chatProfile.id); //
		const messages = this.getProfileMessages(this.props.chatProfile.id.toString());
		return (
			<div className="l-flex-container">
				<div className="l-header">
					<Header
						menu={this.state.menu}
						showMenu={this.onShowMenu}
						hideMenu={this.onHideMenu}
						profile={this.props.chatProfile}
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
						onConversationChange={this.onConversationChange}
						focusedProfile={this.props.chatProfile}
					/>
				</div>
				<div className="l-main l-main__chat c-main c-main--white">
					<Chat
						messages={messages}
						onSendMessage={this.onSendMessage}
					/>
					<div className={`l-chat__user-desc ${this.state.description == "hidden" ? "l-chat__hide-desc" : ""}`}>
						<UserDescription
							profile={this.props.chatProfile.id}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateChatProfile: (profile) => dispatch(updateChatProfile(profile))
	};	
}

const mapStateToProps = (state) => {
	const matches = matchSelector(state.interactions, state.user.id),
		  messages = messagesSelector(state.interactions, state.user.id, matches);

	console.log('sending : ', messages);	
	return {
		notif: state.notif.notification,
		matches: matches, 	// mockMatch,
		messages: messages, //mockMessages,
		chatProfile: state.chat.chatProfile,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
