import React from 'react';
import { connect } from 'react-redux';
import { startLogin, passwordResetEmail } from '../actions/auth';

export class NotificationList extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<div>
				<div className="c-news c-news--unseen">
					<div className="c-news__image-container">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status"></div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">Paola Gracias, liked your profile.</p>
						<p className="c-news__date">3 hours ago</p>
						<p className="c-news__message">Hey ! Wassup boy, doing good ? Just wondering if you where ...</p>
					</div>
				</div>
				<div className="c-news">
					<div className="c-news__image-container">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status"></div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">Paola Gracias, liked your profile.</p>
						<p className="c-news__date">3 hours ago</p>
						<p className="c-news__message">Hey ! Wassup boy, doing good ? Just wondering if you where ...</p>
					</div>
				</div>
			</div>
		)
	};
};

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	}
};

export default connect(mapStateToProps, undefined)(NotificationList);
