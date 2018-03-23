import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import { Header } from '../Header';
import UserCard from './card';
import Menu from './menu';

export class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: 'hidden',
			nextProfileIndex: 0,
			profilesCount: 0,
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
	
	onLoadMore = (profileNumber) => {
		this.setState({ nextProfileIndex: profileNumber });
	}
	
	onChangedFilters = (profilesCount) => {
		this.setState({ profilesCount, nextProfileIndex: 0 });
	}

	render() {
		return (
			<div className="l-flex-container" >
				<div className="l-header">
					<Header
						menu={this.state.menu}
						showMenu={this.onShowMenu}
						hideMenu={this.onHideMenu}
					/>
				</div>
				<div className="l-nav"><Navbar /></div>
				<div
					className={`l-menu c-menu 
						${this.state.menu === "hidden" ? "" : "l-menu__show"}
					`}
				>
					<Menu
						profiles={this.state.nextProfileIndex}
						onChangedFilters={this.onChangedFilters}
					/>
				</div>
				<div className="l-main l-main__search c-main">
					<div>
						<p className="o-title-menu l-title-menu l-cards l-title-menu">{this.props.profilesCount} results nearby</p>
						<UserCard onLoadMore={this.onLoadMore}/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		profilesCount: state.search.profilesCount,
	};
};

export default connect(mapStateToProps, undefined)(SearchPage);
