import React from 'react';
import { connect } from 'react-redux';

export class Message extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className="c-message__wrapper">
				<div className="c-message">
					<p>{this.props.text}</p>
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

export default connect(mapStateToProps, undefined)(Message);
