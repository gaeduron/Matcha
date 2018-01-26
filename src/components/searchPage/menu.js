import React from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	getValue = (value) => {
		console.log(value);
	}

	render() {
		return (
			<div className="">
				<div>
					<h2>Filters</h2>
					<p>Sort by</p>
					<select className="c-onb-form__input--select">
						<option value="0">distance</option>
						<option value="1">Age</option>
						<option value="2">Popularity</option>
					</select>
				</div>
				<div>
					<p>Distance (km)</p>
					<p>5</p>
					<p>-</p>
					<p>25</p>
					<Slider range defaultValue={[20, 50]} disabled={false} onChange={this.getValue} />
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
