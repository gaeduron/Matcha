import React from 'react';
import { connect } from 'react-redux';
import 'element-theme-default';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapWithAMarker from '../searchPage/map';
import { Tags } from './Tags';
import { history } from '../../routers/AppRouter';
import UserPhotos from '../photo/UserPhotos';
import EditProfileForm from './EditProfileForm';
import Geolocate from '../map/Geolocate';
import debounce from 'lodash/debounce';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';

export class EditProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: {
				fname: props.user.fname, 
				lname: props.user.lname,
				nickname: props.user.nickname,
				birthDate: props.user.birthDate,
				gender: props.user.gender,
				orientation: props.user.orientation,
				bio: props.user.bio,
				occupation: props.user.occupation
			},
			tags: props.user.tags,
			photos: props.user.photos,
			location: props.user.location,
			startGetPhotosUrl: false
		};
	}



	/* Child components data retrieval */

	getLocation = (latitude, longitude, geolocationAllowed) => {
		this.setState({
			location: {
				latitude,
				longitude,
				geolocationAllowed
			}
		});
	};

	startGetPhotosUrl = () => {
		this.setState({ startGetPhotosUrl: true }, 
				() => this.setState({ startGetPhotosUrl: false }));
	};

	getPhoto = (photosUrl) => {
	//	this.props.getPhoto({ photosUrl });
		setTimeout(() => this.setState({ photos: photosUrl }), 1000);
		console.log('Photo Urls in OnboardingPhoto', photosUrl);	
	};

	getProfile = (profile) => {
		this.setState({ profile });	
	};

	hasError = (errors) => {
		const { fname, lname, nickname, birthDate, bio, occupation } = this.state.profile;
	
		if (!fname || !lname || !nickname || !birthDate || !bio || !occupation)	
			return true;
		for (let error in errors) {
			if (errors[error])
			 	return true;
		}
		return false;
	};

	/* Lifecycle functions */

	onPrev = () => history.replace('/profile/user-id');
	
	debouncedSave =  debounce(() => {
		if (!this.hasError(this.state.profile.error))	
			console.log('emit data ', this.state);
	}, 1300);

	componentDidUpdate() {
			this.debouncedSave();
	} 


	render() {

		const { photos: initialPhotos, tags, profile } = this.state;
		const { geolocationAllowed, latitude, longitude } = this.state.location;


		const error = {};

		return (
			<div className="c-user-desc c-user-desc--edit">


				{/*********** NAV MENU ***********/}

				<div className="c-edit-menu">
					<button className="l-onb-nav__buttons-right c-button c-button--circle" onClick={this.onPrev}>
						<i className="material-icons">chevron_left</i>
					</button>
					<p>EDIT PROFILE</p>
				</div>


				{/*********** PHOTO UPLOADER ***********/}

				<UserPhotos 
					initialPhotos={initialPhotos} 
					getPhotosUrl={this.getPhoto}
					shouldStartGetPhotosUrl={this.state.startGetPhotosUrl}
				/>

				<button onClick={this.startGetPhotosUrl}> Save photos </button>

				{/******** PROFILE FORM *********/}

				<EditProfileForm 
					profile={profile} 		
					getProfile={this.getProfile}
				/>
				

				{/******** GEOLOCATION *********/}

				<div className="l-onb__location">
					<Geolocate 
						onChange={this.getLocation} 
						geolocationAllowed={geolocationAllowed}		
						latitude={latitude}
						longitude={longitude}
					/>
				</div>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
		user: state.user
	};
};

export default connect(mapStateToProps, undefined)(EditProfile);
