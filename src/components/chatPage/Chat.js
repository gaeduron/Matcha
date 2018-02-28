import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'element-react';
import moment from 'moment';
import 'element-theme-default';
import { Picker, Emoji } from 'emoji-mart';
import { Message } from './Message';

export class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			emojiPicker: "",
			newMessage: "",
			mounted: false,
		};
	}

	changedWriter = (message, i, messages) => {
		if (i !== 0 && message.from !== messages[i-1].from) {
			return true;
		}
		return false;
	}
	
	changedDay = (message, i, messages) => {
		const day = moment(moment(message.time).format("YYYY-MM-DD"));
		if (i === 0) {
			return moment(message.time).format('dddd, MMMM Do');
		} else if (day.diff(moment(messages[i-1].time), 'days') >= 1) {
			return moment(message.time).format('dddd, MMMM Do');
		}
		return false;
	}

	onFaceClick = () => {
		this.setState({ mounted: true });
		if (this.state.emojiPicker === 'translateY(0px)') {
			this.setState({ emojiPicker: 'translateY(600px)'});
		} else {
			this.setState({ emojiPicker: 'translateY(0px)'});
		}
	}

	handleChange = (event) => {
    	this.setState({newMessage: event.target.value});
	}

	addEmoji = (emoji) => {
		let newMessage = this.state.newMessage;
		newMessage += emoji.native;
    	this.setState({ newMessage });	
	}

	render() {
		const emojiVisible = this.state.emojiPicker;
		return (
			<div className="c-chat">
				<div className="c-chat__messages">
				{this.props.messages.map((message, i, messages) => 
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
					<input
						className="c-chat__message-box"
						placeholder="Type a message..."
						value={this.state.newMessage}
						onChange={this.handleChange}
					/>
					<i className="material-icons c-chat__emoji" onClick={this.onFaceClick}>tag_faces</i>
					{ this.state.mounted == true && 
					<Picker
						native={true}
						style={{
							width: '295px',
							position: 'absolute',
							bottom: '78px',
							right: '12px',
							transform: emojiVisible,
						}}
						title=''
						emoji='point_up_2'
						color='#FC2781'
						onClick={this.addEmoji}
					/>
					}
				</div>
			</div>
		);
	}
}

export default Chat;
