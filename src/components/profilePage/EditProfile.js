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
import { saveUserData } from '../../actions/onboarding';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';

//test

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
		};
	}



	/* Child components data retrieval */

	handleAddtag = (tag) => {
		const tags = [...this.state.tags, tag];
		this.setState({ tags });
	};	 

	handleDeletetag = (tag, index) => {
		const tags = this.state.tags.filter((elem) => elem !== tag);
		this.setState({ tags });
	};	 

	getLocation = (latitude, longitude, geolocationAllowed) => {
		this.setState({
			location: {
				latitude,
				longitude,
				geolocationAllowed
			}
		});
	};

	getPhoto = (photosUrl) => {
		this.setState({ photos: photosUrl });
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

	onPrev = (id) => history.replace(`/profile/${id}`);
	
	debouncedSave = debounce(() => {
		if (!this.hasError(this.state.profile.error)) {
			
			let data = {
				...this.state.profile,
				...this.state.location,
				tags: this.state.tags,
				photosUrl: JSON.stringify(this.state.photos),
				sessionToken: this.state.sessionToken
			};
			delete data.error;

			console.log('emit data ', data);
			this.props.saveUserData('SERVER/EDIT_PROFILE', data);
		}
	}, 1300);

	componentDidUpdate(prevProps) {

		if (Object.is(prevProps, this.props))	
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
					<button
						className="l-onb-nav__buttons-right c-button c-button--circle"
						onClick={() => this.onPrev(this.props.user.nickname)}
					>
						<i className="material-icons">chevron_left</i>
					</button>
					<p>EDIT PROFILE</p>
				</div>


				{/*********** PHOTO UPLOADER ***********/}

				<UserPhotos 
					initialPhotos={initialPhotos} 
					onChange={this.getPhoto}
				/>

				{/******** PROFILE FORM *********/}

				<EditProfileForm 
					profile={profile} 		
					getProfile={this.getProfile}
				/>
				

				{/******** TAGS *********/}
				
				<MuiThemeProvider>
						<div className="l-tags">
							<ChipInput
								value={this.state.tags}
								onRequestAdd={(tag) => this.handleAddtag(tag)}
								onRequestDelete={(tag, index) => this.handleDeletetag(tag, index)}
								underlineStyle={{ }}
								hintText={'Add some tags (ex. Batman, Ramen, ...)'}
								chipContainerStyle={{
									backgroundColor: 'red'
								}}
								underlineFocusStyle={{
									borderBottom: '2px solid #fc2b68'
								}}
							/>
						</div>
				</MuiThemeProvider>


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

const mapDispatchToProps = (dispatch) => ({
	saveUserData: (emitMessage, profile) => dispatch(saveUserData(emitMessage, profile))
});

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
		user: state.user
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
