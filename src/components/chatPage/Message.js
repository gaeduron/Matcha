import React from 'react';
import moment from 'moment';

export class Message extends React.Component {
	constructor(props) {
		super(props);
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
						${this.props.from == "you" ? "c-message__wrapper--sent element-animation-slidein-right" : "element-animation-slidein-left"}
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
						>{moment(this.props.time).format('HH:mm')}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Message;
