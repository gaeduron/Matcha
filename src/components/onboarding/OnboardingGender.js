import React from 'react';
import OnboardingNav from './OnboardingNav';
import OnboardingClose from './OnboardingClose';

export default class OnboardingGender extends React.Component {
		
	constructor(props) {
		super(props);

		this.state = {
			gender: this.props.gender ? this.props.gender : 'woman',
			orientation: this.props.orientation ? this.props.orientation : 'bisexual'
		};
	}
	
	handleOnChange = (e, name) => {
		const input = e.target.value;
		this.setState({ [name]: input });	
	};

	onSubmit = () => {
		this.props.getGender(this.state);
	};  

	render () {
		return (
			<div className="l-onb-form__container">
				<OnboardingClose />

				<h4 className="c-onb-form__title">YOU ARE A</h4>

				<form>

					<div className="c-form-input c-form-box__first-input">
						<h5 className="c-form-input__title">ORIENTATION</h5>
							<select 
								className="c-onb-form__input--select c-onb-form__input--select-long"
								onChange={(e) => this.handleOnChange(e, 'orientation')} 
								defaultValue={this.state.orientation}
							>
								<option value='straight'>Straight</option>
								<option value='gay'>Gay</option>
								<option value='bisexual'>Bisexual</option>
							</select> 
					</div>		

					<div className="c-form-input c-form-box__input">
						<h5 className="c-form-input__title">GENDER</h5>
							<select 
								className="c-onb-form__input--select c-onb-form__input--select-long"
								onChange={(e) => this.handleOnChange(e, 'gender')} 
								defaultValue={this.state.gender}
							>
								<option value='woman'>Woman</option>
								<option value='man'>Man</option>
							</select>
					</div>		




				</form>

				<OnboardingNav action={this.onSubmit} />

			</div>
		);
	}
}
