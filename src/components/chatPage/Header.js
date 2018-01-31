import React from 'react';

export class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	onSort = () => this.props.showMenu();
	onArrowBack = () => this.props.hideMenu();

	render() {
		if (this.props.menu === "hidden") {
			return (
				<header className="c-header">		
					<h1 className="c-header--title">CHAT</h1>
				</header>
			);
		} else {
			return (
				<header className="c-header c-header__menu">	
					<i
						className="material-icons c-header--icon-arrow"
						onClick={this.onArrowBack}>arrow_back
					</i>
					<h2 className="c-header--user-name">Paola Gracias</h2>
					<div className="
						c-news__image-container
						c-news__image-container--chat
					">
						<img className="c-news__image" src="https://image.ibb.co/mu4up6/Screen_Shot_2018_01_10_at_5_39_51_PM.png" alt="" />
						<div className="c-news__user-status c-news__user-status--chat"></div>
					</div>	
				</header>
			);
		}
	}
}

export default Header;
