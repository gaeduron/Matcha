import React from 'react';

export class UserStatus extends React.Component {
    constructor(props) {
        super(props);
    }

	onClick = () => {
		const user = this.props.data;

		if (user.clicked === false)
			this.props.clicked(user.notifType, user.notifId, user.id);
		this.props.showProfile();
	};

    render() {
		const user = this.props.data;
		console.log('user menu : ', user);
		const focused = this.props.focused;
		return (
			<div
				className={`
					c-news
					${user.clicked ? "" : "c-news--unseen"}
					${focused && "c-news--focused"}
				`}
				onClick={this.onClick}
			>
				<div className="c-news__image-container c-news__image-container--menu">
					<img className="c-news__image" src={user.photo} alt="" />
					<div 
						className={`c-news__user-status
							${user.connected ? "c-news__user-status--active" : ""}
						`}
					>
					</div>
				</div>
				<div className="c-news__text">
					<p className="c-news__title">{`${user.fname} ${user.lname}, ${user.age}`}</p>
					<p className="c-news__message c-news__message--menu">{user.occupation}</p>
				</div>
			</div>
		)
    }
}

export default UserStatus;
