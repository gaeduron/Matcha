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
					<h1 className="c-header--title">PROFILE</h1>
					{!this.props.noMenu &&
						<i
							className="material-icons c-header--icon-sort"
							onClick={this.onSort}>more_vert
						</i>
					}
				</header>
			);
		} else {
			return (
				<header className="c-header c-header__menu">	
					<i
						className="material-icons c-header--icon-arrow"
						onClick={this.onArrowBack}>arrow_back
					</i>
				</header>
			);
		}
	}
}

export default Header;
