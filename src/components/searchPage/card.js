import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

export class UserCard extends React.Component {

	loadMore = () => {
		console.log("MOOOORE");
		this.props.onLoadMore(this.props.profiles.length);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll, false);
	}

	onScroll = () => {
		console.log("window.innerHeight:",window.innerHeight);
		console.log("window.scrollY:",window.scrollY);
		console.log("document.body.offsetHeight:",this.wrapper.offsetHeight);
		if (
			(window.innerHeight + window.scrollY) >= (this.wrapper.offsetHeight - 5) &&
			this.props.profiles.length
		) {
			this.loadMore();
		}
	}

	render() {
		console.log('current props', this.props);

		return (
			<div
				className="l-cards"
				ref={ wrapper => { this.wrapper = wrapper }}
			>
				{this.props.profiles.map((user, i) => 
					<div className="l-card c-user-card" key={user.firstname+i}>
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
