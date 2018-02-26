import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { history } from '../../routers/AppRouter';
import { updateFocusedProfile } from '../../actions/search';

export class UserCard extends React.Component {

	loadMore = () => {
		console.log('card on load more TRIGGERED', this.props.profiles.length);
		this.props.onLoadMore(this.props.profiles.length);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	componentDidUpdate = () => {
		if (this.wrapper.offsetHeight < window.innerHeight) {
			this.loadMore();
		}
	}

	onScroll = () => {
		if (
			(window.innerHeight + window.scrollY) >= (this.wrapper.offsetHeight - 5) &&
			this.props.profiles.length
		) {
			this.loadMore();
		}
	}

	onProfileFocus = (user) => {
		this.props.updateFocusedProfile(user);
	}
	
	onClick = (user) => {
		history.push(`/profile/${user.id}`);
	}

	render() {
		return (
			<div
				className="l-cards"
				ref={ wrapper => { this.wrapper = wrapper }}
			>
				{this.props.profiles.map((user, i) => 
					<div
						className="l-card c-user-card element-animation"
						key={user.firstname+i}
						onMouseEnter={() => this.onProfileFocus(user)}
						onClick={() => this.onClick(user)}
					>
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

const mapDispatchToProps = (dispatch) => ({
	updateFocusedProfile: (profile) => dispatch(updateFocusedProfile(profile))
});

const mapStateToProps = (state) => ({
	profiles: state.search.profiles,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
