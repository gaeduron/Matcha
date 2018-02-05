import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'element-react';
import 'element-theme-default';
import { Message } from './Message';

export class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [
				{time: "18:34", from: "you", text: "Hey, how are you ?"},
				{time: "18:34", from: "paola", text: "Fine and you?"},
				{time: "18:34", from: "paola", text: "Do you come here often?"},
				{time: "18:37", from: "you", text: "Fine thanks :), It's my first time using this app. Hopefully I will make some cool friends here !"},
				{time: "18:37", from: "paola", text: "Me too, seem like the place too be ;)"},
				{time: "18:40", from: "you", text: "Are you from paris, or are you traveling ?"},
				{time: "18:40", from: "you", text: "I just arrived my self last week."},
			],
		};
	}

	changedWriter = (message, i, messages) => {
		if (i !== 0 && message.from !== messages[i-1].from) {
			return true;
		}
		return false;
	}
	
	changedDay = (message, i, messages) => {
		if (i === 0) {
			return message.time;
		} else if (message.time !== messages[i-1].time) {
			return message.time;
		}
		return false;
	}

	render() {
		return (
			<div className="c-chat">
				<div className="c-chat__messages">
				{this.state.messages.map((message, i, messages) => 
						<Message
							from={message.from}
							time={message.time}
							text={message.text}
							changedWriter={this.changedWriter(message, i, messages)}
							changedDay={this.changedDay(message, i, messages)}
							key={i}
						/>
				)}
				</div>
				<div className="c-chat__message-box-wrapper">
					<input className="c-chat__message-box" placeholder="Type a message..." />
					<i className="material-icons c-chat__emoji">tag_faces</i>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	};
};

export default connect(mapStateToProps, undefined)(Chat);
