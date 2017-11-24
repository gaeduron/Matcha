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
		// Or redux data if the user goes back to the previous steps during onboarding
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
		//console.log('from getProfile', formState);
		this.setState({
			profile: {
				fname: formState.fname.trim(),
				lname: formState.lname.trim(),
				nickname: formState.nickname.trim(),
				birthDate: formState.birthDate
			}	
		});

		this.onNextStep();
	};

	getGender = (state) => {
		const { gender, orientation } = state;
	
		this.setState({
			profile: {
				...this.state.profile,
				gender,
				orientation
			}
		});
		this.onNextStep();
	};

	getTags = (tags) => {
		this.setState({ 
			profile: {
				...this.state.profile,	
				tags 
			}
		});
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
							minAge={18}
				/>}
				{this.state.step == 2 && 
						<OnboardingGender 
							getGender={this.getGender}		
				/>}
				{this.state.step == 3 && <OnboardingPhoto />}
				{this.state.step == 4 && 
						<OnboardingTags
							getTags={this.getTags}
				/>}
				{this.state.step == 5 && <OnboardingLocation />}

				{this.state.step == 6 && <button>Discover people</button>}
				<p>{this.state.step / 5.0 * 100}%</p>

			</div>
		);
	}
}
