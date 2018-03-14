import React from 'react';

export class Notification extends React.Component {
	constructor(props) {
		super(props);
	};

	onClick = () => {
		const user = this.props.data;

		if (user.clicked === false)
			this.props.clicked(user.notifType, user.notifId, user.id);
		this.props.onNewsClick();
	};

	render() {
		const user = this.props.data;
		return (
			<div onClick={this.onClick}>
				<div className={`c-news ${!user.clicked && 'c-news--unseen'}`}>
					<div className="c-news__image-container">
						<img className="c-news__image" src={user.photo} alt="" />
						<div
							className={`c-news__user-status
								${user.connected && 'c-news__user-status--active'}
							`}
						>
						</div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">{`${user.fname} ${user.lname} ${user.type}`}</p>
						{user.content && <p className="c-news__message">{user.content}</p>}
						<p className="c-news__date">{user.time}</p>
					</div>
				</div>
			</div>
		)
	};
};

export default Notification;
