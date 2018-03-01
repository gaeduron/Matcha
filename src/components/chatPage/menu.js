import React from 'react';
import { connect } from 'react-redux';
import UserStatus from '../profilePage/UserStatus';
import _ from 'lodash';

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
		};
	}
	
	onClick = (user) => {
		this.props.showMenu();
		this.props.onConversationChange(user);
	}

	onSearch = (e) => {
		const search = e.target.value;
		this.setState(() => ({ search }));
	}
	
	searchProfile = (profiles) => {
		if (this.state.search === "") {
			return profiles;
		}
		return profiles.filter(profile => {
			const profileString = `${profile.fname} ${profile.lname}, ${profile.age.toString()}
				 ${profile.occupation}`;

			
			if (profileString.toLowerCase().includes(this.state.search.toLowerCase())) {
				return profile;
			}
		});
	}

	render() {
		const profiles = this.searchProfile(this.props.matches);
		return (
			<div className="c-menu__wrapper">
				<div className="c-menu__search-bar-box">
					<h2 className="o-little-title c-menu__search-bar-title">MATCHES</h2>
					<div>
						<input
							className="c-menu__search-bar"
							type="text"
							placeholder="Search"
							onChange={this.onSearch}
							value={this.state.search}
						>
						</input>
						<i className="material-icons c-menu__search-bar-icon">search</i>
					</div>
				</div>
				{profiles.map((user) => (
					<UserStatus
						data={user}
						showProfile={() => this.onClick(user)}
						key={user.id}
						focused={user.id == this.props.focusedProfile.id}
					/>
				))}
				{profiles.length === 0 && 
					<p className='o-little-title c-menu__search-bar-title'>No user found</p>
				}
			</div>
		);
	}
}

export default SearchMenu;
