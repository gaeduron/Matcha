import React from 'react';
import { connect } from 'react-redux';

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
		};
	}
	
	onSort = () => this.props.showMenu();

	render() {
		return (
			<div className="c-menu__wrapper">
				<div className="c-menu__search-bar-box">
					<h2 className="o-little-title c-menu__search-bar-title">MATCHES</h2>
					<div>
						<input className="c-menu__search-bar" type="text" placeholder="Search">
						</input>
						<i className="material-icons c-menu__search-bar-icon">search</i>
					</div>
				</div>
				<div className="c-news" onClick={this.onSort}>
					<div className="c-news__image-container c-news__image-container--menu">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status"></div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">Paola Gracias, 26</p>
						<p className="c-news__message c-news__message--menu">Data Scientist at Roberim</p>
					</div>
				</div>
				<div className="c-news" onClick={this.onSort}>
					<div className="c-news__image-container c-news__image-container--menu">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status"></div>
					</div>
					<div className="c-news__text">
						<p className="c-news__title">Paola Gracias, 26</p>
						<p className="c-news__message c-news__message--menu">Data Scientist at Roberim</p>
					</div>
				</div>
				<div className="c-news" onClick={this.onSort}>
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
