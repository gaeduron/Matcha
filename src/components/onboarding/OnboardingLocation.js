import React from 'react';
import axios from 'axios';
import { Button } from 'element-react';
import OnboardingNav from './OnboardingNav';
import OnboardingClose from './OnboardingClose';
import Geolocate from '../map/Geolocate';
import 'element-theme-default';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';
//AIzaSyC2Z8zLwy0uT8hd8qyBgfMmoqpKJRZwRkI


export default class OnboardingLocation extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			geolocationAllowed: this.props.geolocationAllowed
		};
	}

	getLocation = () => {
		this.props.getLocation({ 
			latitude: this.state.latitude, 
			longitude: this.state.longitude,
			geolocationAllowed: this.state.geolocationAllowed
		});
	};

	onChange = (latitude, longitude, geolocationAllowed) => {
		this.setState({
			latitude,
			longitude,
			geolocationAllowed
		});
	};

	componentDidMount() {
		axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEOLOCATION_API_KEY}`)
			.then((response) => {
				let { lat: latitude, lng: longitude } = response.data.location;	
				this.setState({latitude, longitude});
			})
			.catch((e) => {
				console.log('Invalid Google API key');
			});
	}

	render () {
		const { geolocationAllowed, latitude, longitude, loading, error } = this.state;
			
		return (
			<div className="l-onb-form__container">
				<OnboardingClose />

				<h4 className="c-onb-form__title">WHERE ARE YOU FROM ?</h4>
				<div className="l-onb__location">
					<Geolocate 
						onChange={this.onChange} 
						geolocationAllowed={geolocationAllowed}		
						latitude={latitude}
						longitude={longitude}
					/>
				</div>
				<OnboardingNav action={this.getLocation} />

			</div>
		);
	}
}
