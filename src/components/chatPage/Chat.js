import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'element-react';
import 'element-theme-default';

export class Chat extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className="c-chat">
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
