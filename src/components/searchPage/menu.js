import React from 'react';
import { connect } from 'react-redux';
import { Slider } from 'antd';

export class SearchMenu extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			distanceRange: [5, 40],	
			ageRange: [24, 34],	
			popularityRange: [50, 400],	
		};
	}

	getDistance = (value) => {
		const distanceRange = value;
		this.setState(() => ({ distanceRange }));
	}
	
	getAge = (value) => {
		const ageRange = value;
		this.setState(() => ({ ageRange }));
	}
	
	getPopularity = (value) => {
		const popularityRange = value;
		this.setState(() => ({ popularityRange }));
	}

	render() {
		return (
			<div className="">
				<div className="c-menu__title-container">
					<h2 className="c-menu__title">Filters</h2>
					<div>
						<p className="c-sort__title">Sort by</p>
						<select className="c-onb-form__input--select">
							<option value="0">distance</option>
							<option value="1">age</option>
							<option value="2">popularity</option>
						</select>
					</div>
				</div>
				<div className="c-slider">
					<div className="c-slider__text-box">
						<p className="c-slider__text c-slider__title">Distance (km)</p>
						<div>
							<p className="c-slider__text c-slider__value">{ this.state.distanceRange[0] }</p>
							<p className="c-slider__text">-</p>
							<p className="c-slider__text c-slider__value">
								{ this.state.distanceRange[1] == 100 ? "100+" : this.state.distanceRange[1] }
							</p>
						</div>
					</div>
					<Slider range defaultValue={this.state.distanceRange} onChange={this.getDistance} />
				</div>
				<div className="c-slider">
					<div className="c-slider__text-box">
						<p className="c-slider__text c-slider__title">Age</p>
						<div>
							<p className="c-slider__text c-slider__value">{ this.state.ageRange[0] }</p>
							<p className="c-slider__text">-</p>
							<p className="c-slider__text c-slider__value">
								{ this.state.ageRange[1] == 100 ? "100+" : this.state.ageRange[1] }
							</p>
						</div>
					</div>
					<Slider range min={18} defaultValue={this.state.ageRange} onChange={this.getAge} />
				</div>
				<div className="c-slider">
					<div className="c-slider__text-box">
						<p className="c-slider__text c-slider__title">Popularity</p>
						<div>
							<p className="c-slider__text c-slider__value">{ this.state.popularityRange[0] }</p>
							<p className="c-slider__text">-</p>
							<p className="c-slider__text c-slider__value">
								{ this.state.popularityRange[1] == 1000 ? "1000+" : this.state.popularityRange[1] }
							</p>
						</div>
					</div>
					<Slider range max={1000} defaultValue={this.state.popularityRange} onChange={this.getPopularity} />
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
