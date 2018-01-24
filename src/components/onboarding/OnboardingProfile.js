import React from 'react';
import moment from 'moment';
import BirthdatePicker from '../utils/BirthdatePicker';
import OnboardingNav from './OnboardingNav';

export default class OnboardingProfile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			fname: props.fname ? props.fname : '',
			lname: props.lname ? props.lname : '',
			nickname: props.nickname ? props.nickname : '',
			birthDate: props.birthDate ? props.birthDate : '',
			touched: {
				fname: false,
				lname: false,
				nickname: false,
				birthDate: false,
				form: false
			}
		};
	}

	handleOnChange = (e, name) => {
		const input = e.target.value;

		if (!input || input.match(/^[a-z][a-z \-]*$/i)) {
			this.setState({ 
				[name]: input, 
				touched: { 
					...this.state.touched,
					[name]: true
				}	
			});	
		}
	};

	getTimestamp = (timestamp) => {
		let birthDate = timestamp;
		this.setState({ 
			birthDate,
			touched: {
				...this.state.touched,
				birthDate: true
			}
		});
	};	

	findAge = (birthDate) => {
		let now = new Date(Date.now());
		let timeDiff = Math.abs(now.getTime() - birthDate.getTime());
		let age = Math.floor(timeDiff / (1000 * 3600 * 24 * 365)); 
	
		return age;
	};

	isAgeAllowed = () => {
		if (!this.state.touched.birthDate || !this.state.birthDate)
			return true;

		let minAge = this.props.minAge ? this.props.minAge : 18;
		let age = this.findAge(this.state.birthDate);	
	
		return (age < minAge) ? false : true;
	};
	
	validate = (state) => {
		const { lname, fname, nickname, birthDate, touched} = state;
		const NICKNAME_ERR = 'Please provide your nickname';
		const FNAME_ERR = 'Please provide your firstname';
		const LNAME_ERR = 'Please provide your lastname';
		const MIN_AGE_ERR = 'You must be at least 18';
		const BIRTHDATE_ERR = 'Please provide your birthdate';

		return {
			nickname: (!nickname && (touched.form || touched.nickname)) ? NICKNAME_ERR : '', 
			fname: (!fname && (touched.form || touched.fname)) ? FNAME_ERR : '', 
			lname: (!lname && (touched.form || touched.lname)) ? LNAME_ERR : '', 
			minAge:	!this.isAgeAllowed() && touched.birthDate ? MIN_AGE_ERR : '',
			birthDate: touched.form && !birthDate ? BIRTHDATE_ERR : ''
		};		
	};

	hasError = (errors) => {
		const { fname, lname, nickname, birthDate } = this.state;
	
		if (!fname || !lname || !nickname || !birthDate)	
			return true;
		for (let error in errors) {
			if (errors[error])
			 	return true;
		}
		return false;
	};

	onSubmit = (error) => {
		this.setState({ touched: {
				...this.state.touched,
				form: true
			}
		});
		if (this.hasError(error))	
			return ;
		this.props.getProfile(this.state);
	};


	render () {
	
		let error = this.validate(this.state);

		return (
			<div className="l-onb-form__container">
				<form>
					<h4 className="c-onb-form__title">LET'S KNOW EACH OTHER</h4>

					<div className="c-form-input c-form-box__first-input">
						<h5 className={(error.fname ? 'c-onb-form__error' : 'c-form-input__title')}>{error.fname ? error.fname : 'FIRSTNAME'}</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'fname')}
							type="text"
							placeholder="Firstname"
							autoFocus
							value={this.state.fname}
						/>
					</div>

					<div className="c-form-input c-form-box__input">
						<h5 className={(error.lname ? 'c-onb-form__error' : 'c-form-input__title')}>{error.lname ? error.lname : 'LASTNAME'}</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'lname')}
							type="text"
							placeholder="Lastname"
							value={this.state.lname}
						/>
					</div>

					<div className="c-form-input c-form-box__input">
						<h5 className={(error.nickname ? 'c-onb-form__error' : 'c-form-input__title')}>{error.nickname ? error.nickname : 'NICKNAME'}</h5>
						<input 
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'nickname')}
							type="text"
							placeholder="Nickname"
							value={this.state.nickname}
						/>
					</div>

					<h4 className="c-onb-form__title">BIRTHDATE</h4>
					<BirthdatePicker 
						getTimestamp={this.getTimestamp} 
						birthDate={this.props.birthDate}
					/>
					<p>{error.birthDate}</p>
					<p>{error.minAge}</p>
				</form>
				<OnboardingNav action={() => this.onSubmit(error)} />

			</div>
		);
	}
}
