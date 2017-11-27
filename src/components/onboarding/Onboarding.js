import React from 'react';
import { Progress, Button } from 'element-react';
import 'element-theme-default';

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
			step: 0,
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

	onBackStep = () => {
		this.setState(() => ({step: this.state.step - 1}));
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

	getLocation = (location) => {
		this.setState({
			profile: {
				...this.state.profile,	
				location 
			}
		});		
		this.onNextStep();
	};
	

	render () {

		const { step } = this.state; 

		const { 
			fname, 
			lname, 
			nickname,
			location,
			gender,
			orientation,
			birthDate,
			tags
		} = this.state.profile; 

		return (
			<div className="page-header">
				<div className="content-container">
					{step != 0 &&  <Button onClick={this.onBackStep} plain={true} type="info" icon="arrow-left"></Button>}

					{step == 0 && 
							<OnboardingProfile 
								fname={fname}
								lname={lname}
								nickname={nickname}
								month={birthDate}
								getProfile={this.getProfile}
								minAge={18}
					/>}
					{step == 1 && 
							<OnboardingGender 
								getGender={this.getGender}		
					/>}
					{step == 2 && <OnboardingPhoto />}
					{step == 3 && 
							<OnboardingTags
								getTags={this.getTags}
					/>}
					{step == 4 && 
							<OnboardingLocation 
								getLocation={this.getLocation}
					/>}

					{step == 5 && <button>Discover people</button>}
					<br />
					<br />

					<Progress percentage={step / 5.0 * 100} status={step == 5 ? "success" : undefined }/> 


				</div>
			</div>
		);
	}
}
