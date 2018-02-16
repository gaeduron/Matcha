import React from 'react';
import UserPhotos from '../photo/UserPhotos';
import OnboardingNav from './OnboardingNav';
import OnboardingClose from './OnboardingClose';

export default class OnboardingPhoto extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			photosUrl: this.props.initialPhotos ? this.props.initialPhotos : '' 
		};
	}

	startGetPhotosUrl = () => {
		const { photosUrl } = this.state;
		this.props.getPhoto({ photosUrl: JSON.stringify(photosUrl) });
		console.log('Photo Urls in OnboardingPhoto', this.state.photosUrl);	
	};

	onChange = (photosUrl) => {
		this.setState({ photosUrl });
	}; 

	render () {
		const { photosUrl } = this.state;
			
		return (
			<div className="l-onb-form__container"> 	
				<OnboardingClose />
				<h4 className="c-onb-form__title l-onb-margin-bottom">CHOOSE YOUR BEST PROFILE PICTURES</h4>
	
				<UserPhotos 
					initialPhotos={photosUrl} 
					onChange={this.onChange}
				/>	

				<OnboardingNav action={this.startGetPhotosUrl} />
			</div>
		);
	}
}

