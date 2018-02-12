import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export class UserCard extends React.Component {

	render() {
		console.log(this.props);
		return (
			<div className="l-cards">
				{this.props.profiles.map((user, i) =>
					<div className="l-card c-user-card" key={user.photos[0]+i}>
						<div className="c-user-card__gradient"/>
						<div className="c-user-card__text">
							<p className="c-user-card__title">
								{`${user.firstname} ${user.lastname}, ${moment().diff(user.birthdate, 'years')}`}
							</p>
							<p className="c-user-card__date">
								{`${user.occupation}`}	
							</p>
						</div>
						<img className="c-user-card__image" src={user.photos[0]} alt="" />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	profiles: state.search.profiles,
});

export default connect(mapStateToProps, undefined)(UserCard);
