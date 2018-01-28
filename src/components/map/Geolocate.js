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

const defaultMapUrl = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y&center=48.87851721262906,2.298592198364293&zoom=14&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=400x400';



export default class Geolocate extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			latitude: this.props.latitude,
			longitude: this.props.longitude,
			located: this.props.located ? true : false,
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
		}, 3000);
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
		const { located, loading, error, latitude, longitude } = this.state;

		const locatedMapUrl = `https://maps.googleapis.com/maps/api/staticmap?key=${GOOGLE_GEOLOCATION_API_KEY}&center=${latitude},${longitude}&zoom=12&format=png&maptype=roadmap&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Cvisibility:off&style=feature:transit%7Cvisibility:off&style=feature:water%7Celement:labels.text%7Cvisibility:off&size=400x400&markers=color:red%7C${latitude},${longitude}`;
			
		const mapUrl = located ? locatedMapUrl : defaultMapUrl;

		return (
			<div className="c-geolocation__container l-geolocation__container" style={{ backgroundImage: `url(${mapUrl})` }}>

				{ loading ? (
					<button className='c-button l-geolocation__button c-button--circle' onClick={this.findLocation}>
						<div className="spinner"></div> 
					</button>
				) : ( 
					<button className='c-button l-geolocation__button' onClick={this.findLocation}>
						<div>{ located ? 'Update my location' : 'Share my location' }</div>
						<div><i className="material-icons margin-left-icon">place</i></div>
					</button>
				)}

			</div>
		);
	}
}

