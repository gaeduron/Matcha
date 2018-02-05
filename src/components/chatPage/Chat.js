import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'element-react';
import 'element-theme-default';
import { Message } from './Message';

export class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className="c-chat">
				<p className="c-chat__date-text">20 DECEMBRE 2017, 18:34</p>
				<Message text="On fait un test yo yo yoo yoooo "/>
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
