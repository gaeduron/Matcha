import React from 'react';
import axios from 'axios';
import { Button } from 'element-react';
import 'element-theme-default';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';


export default class OnboardingLocation extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			located: this.props.latitude ? true : false,
			loading: false
		};
	}

	geolocationFailure = () => {
		this.setState({ 
			loading: false,
			error: 'Please enable browser geolocation and retry, or skip to the last step'
		});
		
	}; 

	geolocationSuccess = (position) => {
		let { latitude, longitude } = position.coords;			
		setTimeout(() => {
			this.setState({
				latitude, 
				longitude,
				located: true,
				loading: false
			});
		}, 1000);
	}; 

	getLocation = () => {
		this.props.getLocation({ 
			latitude: this.state.latitude, 
			longitude: this.state.longitude 
		});
	};

	findLocation = () => {
		this.setState({loading: true});

		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationFailure);
		} else {
			alert('geolocation failed');
			this.setState({
				error: 'Your browser doesn\'t support geolocation'
			});
		}
	};

	componentDidMount() {
		axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEOLOCATION_API_KEY}`)
			.then((response) => {
				let { lat: latitude, lng: longitude } = response.data.location;	
				this.setState({latitude, longitude});
		});
		// HANDLE ERRORS
	}

	render () {
		const { located, loading, error } = this.state;
			
		return (
			<div>
				<p>Location</p>

				<Button 
					type="primary" 
					loading={loading} 
					onClick={located ? this.getLocation : this.findLocation}
				>
					{ located ? 'We\'re all set, continue !' : 'Find my location' }
				</Button> 
				<p>{error}</p>
				<div>
					<Button type="text" onClick={this.getLocation}>Skip</Button>
				</div>

			</div>
		);
	}
}
