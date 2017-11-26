import React from 'react';
import axios from 'axios';

const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';

//HANDLE ERRORS PROPERLY 
//HANDLE USER NEXT STEP 
//HANDLE LOADING TIMES 

export default class OnboardingLocation extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			located: false
		};
	}

	
	
	geolocationFailure = () => {
		//do something better
		alert('geoloc failure');
	}; 

	geolocationSuccess = (position) => {
		let { latitude, longitude } = position.coords;			
		this.setState({
			latitude, 
			longitude,
			located: true
		});
	}; 

	getLocation = () => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationFailure);
		} else {
			alert('geolocation failed');
			this.setState({
				error: 'Your browser doesn\'t allow geolocation'
			});
		}
			
	};
		

	componentDidMount() {
		axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_GEOLOCATION_API_KEY}`)
			.then((response) => {
				let latitude = response.data.location.lat;	
				let longitude = response.data.location.lng;	
				this.setState({latitude, longitude});
		});
		// HANDLE ERRORS
	}

	render () {
		const located = this.state.located;
			
		return (
			<div>
				<p>Location</p>

				{ !located && <button onClick={this.getLocation}>Find my location</button> }
				{ located && <button >Continue</button> }
				<button>Skip</button>

			</div>
		);
	}
}
