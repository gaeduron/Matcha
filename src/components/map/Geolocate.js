/*
 * [ ] Make URL size dynamic for responsive UI 
 * [ ] connect the new component with Onboarding Nav  
 * [ ] Regenerate a new API Key, set it in defaultMapUrl, and move it to env variable	
 *
 * */


import React from 'react';
import axios from 'axios';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';

const defaultMapUrl = `https://maps.googleapis.com/maps/api/staticmap?key=${GOOGLE_GEOLOCATION_API_KEY}&center=48.87851721262906,2.298592198364293&zoom=14&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=400x400`;



export default class Geolocate extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			geolocationAllowed: this.props.geolocationAllowed ? true : false,
			loading: false
		};
	}

	geolocationFailure = () => {
		this.setState({ 
			loading: false,
			error: 'Please enable browser geolocation'
		});
		
	}; 

	geolocationSuccess = (position) => {
		let { latitude, longitude } = position.coords;			
		let geolocationAllowed = true;

		setTimeout(() => {
			this.setState({
				latitude, 
				longitude,
				geolocationAllowed,
				loading: false,
				error: null	
			});
			
			this.props.onChange(latitude, longitude, geolocationAllowed);

		}, 2000);
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

	render () {
		const { geolocationAllowed, loading, error, latitude, longitude } = this.state;

		const geolocationAllowedMapUrl = `https://maps.googleapis.com/maps/api/staticmap?key=${GOOGLE_GEOLOCATION_API_KEY}&center=${latitude},${longitude}&zoom=13&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:geometry.fill%7Ccolor:0x65aecc&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=400x400&markers=color:red%7C${latitude},${longitude}`;
			
		const mapUrl = geolocationAllowed ? geolocationAllowedMapUrl : defaultMapUrl;

		return (
			<div className="c-geolocation__container l-geolocation__container" style={{ backgroundImage: `url(${mapUrl})` }}>

				{ loading ? (
					<button className='c-button l-geolocation__button c-button--circle' onClick={this.findLocation}>
						<div className="spinner"></div> 
					</button>
				) : ( 
					<button className='c-button l-geolocation__button' onClick={this.findLocation}>
						<div>{ geolocationAllowed ? 'Update my location' : 'Allow access to my location' }</div>
						<div><i className="material-icons margin-left-icon">place</i></div>
					</button>
				)}

				<div className="marker"></div>
				<div className={ error ? 'c-geolocation__error visible' : 'c-geolocation__error hidden' }>
					<p><i className="material-icons c-geolocation__error-icon">error_outline</i>{error}</p>
				</div>

			</div>
		);
	}
}

