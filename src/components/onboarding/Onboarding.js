import React from 'react';
import OnboardingProfile from './OnboardingProfile'
import OnboardingGender from './OnboardingGender'
import OnboardingPhoto from './OnboardingPhoto'
import OnboardingTags from './OnboardingTags'
import OnboardingLocation from './OnboardingLocation'

export default class Onboarding extends React.Component {
	constructor(props) {
		super(props);

		// Pass facebook data if available (lname, fname, birthdate, photo)
		this.state = {
			step: 1,
			profile: {
				fname: 'john',
				lname: 'doe'
			},
			errors: ''
		};
	}

	onNextStep = () => {
		this.setState(() => ({step: this.state.step + 1}));
	};

	getProfile = (formState) => {
		console.log('from getProfile', formState);
		this.onNextStep();
	};

	getGender = (e) => {
		e.preventDefault();	
		console.log('from getGender', e.target);
		this.onNextStep();
	};

	render () {
		return (
			<div>

				{this.state.step == 1 && 
						<OnboardingProfile 
							fname={this.state.profile.fname}
							lname={this.state.profile.lname}
							getProfile={this.getProfile}
				/>}
				{this.state.step == 2 && 
						<OnboardingGender 
							getGender={this.getGender}		
				/>}
				{this.state.step == 3 && <OnboardingPhoto />}
				{this.state.step == 4 && <OnboardingTags />}
				{this.state.step == 5 && <OnboardingLocation />}

				{this.state.step == 6 && <button>Discover people</button>}
				<p>{this.state.step / 5.0 * 100}%</p>

			</div>
		);
	}
}
