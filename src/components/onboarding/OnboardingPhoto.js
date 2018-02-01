import React from 'react';
import UserPhotos from '../photo/UserPhotos';
import OnboardingNav from './OnboardingNav';
import OnboardingClose from './OnboardingClose';

export default class OnboardingPhoto extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			startGetPhotosUrl: false
		};
	}

	startGetPhotosUrl = () => {
		this.setState({ startGetPhotosUrl: true }, 
				() => this.setState({ startGetPhotosUrl: false }));
	};

	getPhoto = (photosUrl) => {
		this.props.getPhoto({ photosUrl });
		console.log('Photo Urls in OnboardingPhoto', photosUrl);	
	};

	render () {
		const { initialPhotos } = this.props;
				
			
		return (
			<div className="l-onb-form__container"> 	
				<OnboardingClose />
				<h4 className="c-onb-form__title l-onb-margin-bottom">CHOOSE YOUR BEST PROFILE PICTURES</h4>
	
				<UserPhotos 
					initialPhotos={initialPhotos} 
					getPhotosUrl={this.getPhoto}
					shouldStartGetPhotosUrl={this.state.startGetPhotosUrl}
				/>	

				<OnboardingNav action={this.startGetPhotosUrl} />
			</div>
		);
	}
}

