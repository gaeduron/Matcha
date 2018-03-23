import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import { Header } from './Header';
import UserDescription from './UserDescription';
import EditProfile from './EditProfile';
import Menu from './menu';

export class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: 'hidden',
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
		window.scroll(0, 0);
		if (this.props.userID == this.props.match.params.uid) {
			return (
				<div className="l-flex-container">
					<div className="l-header">
						<Header
							menu={this.state.menu}
							showMenu={this.onShowMenu}
							hideMenu={this.onHideMenu}
							noMenu={false}
						/>
					</div>
					<div className="l-nav"><Navbar /></div>
					<div
						className={`l-menu c-menu c-menu--white c-menu--no-padding 
							${this.state.menu === "hidden" ? "" : "l-menu__show"}
						`}
					>
						<Menu />
					</div>
					<div className="l-main l-main__search c-main c-main--white">
						<div className="l-user-desc__box">
							{this.props.edit 
								? <EditProfile />
								: <UserDescription profile={false} />
							}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="l-flex-container">
					<div className="l-header">
						<Header
							menu={this.state.menu}
							showMenu={this.onShowMenu}
							hideMenu={this.onHideMenu}
							noMenu={true}
						/>
					</div>
					<div className="l-nav"><Navbar /></div>
					<div className="l-main l-main--wide l-main__search c-main c-main--white">
						<div className="l-user-desc__box">
							<UserDescription profile={this.props.match.params.uid} />
						</div>
					</div>
				</div>
			);

		}
	}
}

const mapStateToProps = (state) => {
	return {
		userID: state.user.id,
	};
};

export default connect(mapStateToProps, undefined)(SearchPage);
