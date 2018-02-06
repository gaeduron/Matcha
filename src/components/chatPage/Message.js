import React from 'react';
import { connect } from 'react-redux';

export class Message extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	header = () => {
		if (this.props.changedDay) {
			return <p className="c-chat__date-text">${this.props.time}</p>;
		} else if (this.props.changedWriter) {
			<br />
		}
	}

	render() {
		return (
			<div>
				{this.props.changedDay && 
					<p className="c-chat__date-text">{this.props.changedDay}</p>
				}
				{this.props.changedWriter && !this.props.changedDay && 
					 <br />
				}
				<div
					className={`c-message__wrapper
						${this.props.from == "you" ? "c-message__wrapper--sent" : ""}
					`}
				>
					<div
						className={`c-message
							${this.props.from == "you" ? "c-message--sent" : ""}
						`}
					>
						<p>{this.props.text}</p>
						<p
							className={`c-message__date 
								${this.props.from == "you" ? "c-message__date--sent" : ""}
							`}
						>{this.props.time}</p>
					</div>
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
