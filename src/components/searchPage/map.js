import React from 'react';
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
const mapStyle = require('./mapStyle.json');

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
	defaultOptions={{ styles:
		mapStyle,
		streetViewControl: false,
    	scaleControl: false,
   		mapTypeControl: false,
     	panControl: true,
     	zoomControl: false,
     	rotateControl: false,
     	fullscreenControl: false,
	}}
    defaultZoom={8}
    zoom={props.zoom}
    center={{ lat: props.me.lat, lng: props.me.lon }}
  >
    <Marker
      position={{ lat: props.me.lat, lng: props.me.lon }}
	  icon={{ url: props.me.photo }}
    />
	{ props.profile && 
	<Marker
      position={{ lat: props.profile.lat, lng: props.profile.lon }}
	  icon={{ url: props.profile.photo }}
    />
	}
  </GoogleMap>
);

export default MapWithAMarker;
