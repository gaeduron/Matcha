import React from 'react';
import { connect } from 'react-redux';

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: "Likes",
		};
	}

	onPageLikes = () => {
		const page = "Likes";
		this.setState({ page });
	}
	
	onPageVisits = () => {
		const page = "Visits";
		this.setState({ page });
	}

	render() {
		return (
			<div className="c-menu__wrapper">
				<div>
						<h2 className={
							`c-menu__page
							${this.state.page === "Likes" ? "" : "c-menu__page--hidden"}
						`} onClick={this.onPageLikes}>
							Likes
						</h2>
						<h2 className={
							`c-menu__page
							${this.state.page === "Visits" ? "" : "c-menu__page--hidden"}
						`} onClick={this.onPageVisits}>
							Visits
						</h2>
				</div>
				<div className="c-news">
					<div className="c-news__image-container c-news__image-container--menu">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status"></div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">Paola Gracias, 26</p>
						<p className="c-news__message c-news__message--menu">Data Scientist at Roberim</p>
					</div>
				</div>
				<div className="c-news">
					<div className="c-news__image-container c-news__image-container--menu">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status"></div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">Paola Gracias, 26</p>
						<p className="c-news__message c-news__message--menu">Data Scientist at Roberim</p>
					</div>
				</div>
				<div className="c-news">
					<div className="c-news__image-container c-news__image-container--menu">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status"></div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">Paola Gracias, 26</p>
						<p className="c-news__message c-news__message--menu">Data Scientist at Roberim</p>
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

export default connect(mapStateToProps, undefined)(SearchMenu);
