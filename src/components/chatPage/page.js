import React from 'react';
import { connect } from 'react-redux';
import { Navbar } from '../Navbar';
import { Header } from './Header';
import Menu from './menu';
import Chat from './Chat';
import UserDescription from './UserDescription.js';

export class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: 'hidden',
			description: 'visible',
		};
	}

	onShowMenu = () => {	
		const menu = 'visible';
		this.setState(() => ({ menu }));
	}
	
	onHideMenu = () => {	
		const menu = 'hidden';
		this.setState(() => ({ menu }));
	}

	render() {
		return (
			<div className="l-flex-container">
				<div className="l-header">
					<Header
						menu={this.state.menu}
						showMenu={this.onShowMenu}
						hideMenu={this.onHideMenu}
					/>
				</div>
				<div className="l-nav"><Navbar /></div>
				<div
					className={`l-menu l-menu--slide-left c-menu c-menu--white c-menu--no-padding
						${this.state.menu === "visible" ? "" : "l-menu__show"}
					`}
				>
					<Menu 
						showMenu={this.onShowMenu}
					/>
				</div>
				<div className="l-main l-main__chat c-main c-main--white">
					<Chat />
					<div className={`l-chat__user-desc ${this.state.description == "hidden" ? "l-chat__hide-desc" : ""}`}>
						<UserDescription />
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

export default connect(mapStateToProps, undefined)(SearchPage);
