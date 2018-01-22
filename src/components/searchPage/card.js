import React from 'react';
import { connect } from 'react-redux';

export class UserCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="c-user-card">
					<div className="c-user-card__gradient"/>
					<div className="c-user-card__text">
						<p className="c-user-card__title">Paola Gracias, 29</p>
						<p className="c-user-card__date">Data Scientist at Robetim</p>
					</div>
					<img className="c-user-card__image" src="http://image.ibb.co/dKurob/Screen_Shot_2018_01_22_at_5_33_26_PM.png" alt="" />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	}
};

export default connect(mapStateToProps, undefined)(UserCard);
