import React from 'react';
import { connect } from 'react-redux';
import UserStatus from '../profilePage/UserStatus';

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);
	}
	
	onClick = (user) => {
		this.props.showMenu();
		this.props.onConversationChange(user);
	};

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
				{this.props.matches.map((user) => (
					<UserStatus
						data={user}
						showProfile={() => this.onClick(user)}
						key={user.id}
					/>
				))}
			</div>
		);
	}
}

export default SearchMenu;
