import React from 'react';
import moment from 'moment';
import BirthdatePicker from '../utils/BirthdatePicker';

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

	onSubmit = (e, error) => {
		e.preventDefault();
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
			<div>
				<form onSubmit={(e) => this.onSubmit(e, error)} onChange={this.log}>
					<p><b>Let's know each other</b></p>
					<input
						onChange={(e) => this.handleOnChange(e, 'fname')}
						type="text"
						placeholder="Firstname"
						autoFocus
						value={this.state.fname}
					/>
					<p>{error.fname}</p>

					<input
						onChange={(e) => this.handleOnChange(e, 'lname')}
						type="text"
						placeholder="Lastname"
						value={this.state.lname}
					/>
					<p>{error.lname}</p>

					<input 
						onChange={(e) => this.handleOnChange(e, 'nickname')}
						type="text"
						placeholder="Nickname"
						value={this.state.nickname}
					/>
					<p>{error.nickname}</p>

					<p><b>Birthdate</b></p>
					<BirthdatePicker 
						getTimestamp={this.getTimestamp} 
						birthDate={this.props.birthDate}
					/>
					<p>{error.birthDate}</p>
					<p>{error.minAge}</p>
					<input type="submit" value="Continue"/>
				</form>

			</div>
		);
	}
}
