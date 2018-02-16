import React from 'react';
import BirthdatePicker from '../utils/BirthdatePicker';
import Textarea from 'react-textarea-autosize';

export default class EditProfileForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fname: props.profile.fname ? props.profile.fname : '',
			lname: props.profile.lname ? props.profile.lname : '',
			nickname: props.profile.nickname ? props.profile.nickname : '',
			birthDate: props.profile.birthDate ? props.profile.birthDate : '',
			gender: props.profile.gender ? props.profile.gender : 'woman',
			orientation: props.profile.orientation ? props.profile.orientation : 'bisexual',
			bio: props.profile.bio ? props.profile.bio : '',
			occupation: props.profile.occupation ? props.profile.occupation : '',
			touched: {
				fname: false,
				lname: false,
				nickname: false,
				birthDate: false,
				bio: false,
				occupation: false,
				form: false
			},
			error: {}
		};
	}

	validate = {
		fname: (input) => (!input || input.match(/^[a-z][a-z \-]*$/i) && input.length < 255),
		gender: (input) => (!input || input == 'man' || input == 'woman'),
		orientation: (input) => (!input || input == 'straight' || input == 'gay' || input == 'bisexual'),
		occupation: (input) => (!input || input.length < 51),
		bio: (input) => (!input || input.length < 599)
	};
	
	handleOnChange = (e, name, validate) => {
		const input = e.target.value;

		if (validate(input)) {
			
			const nextState = {
				...this.state,
				[name]: input, 
				touched: { 
					...this.state.touched,
					[name]: true
				}
			};

			this.setState({
				...nextState,
				error: this.checkErrors(nextState)
			},
				() => {
					this.props.getProfile(this.state);
				}
			);	
		}
	};

	getTimestamp = (timestamp) => {
		let birthDate = timestamp;

		const nextState = {
			...this.state,
			birthDate, 
			touched: { 
				...this.state.touched,
				birthDate: true
			}
		};

		this.setState({ ...nextState }, () => { 
			this.setState({ error: this.checkErrors(nextState) },
				() => {
					this.props.getProfile(this.state);
				}
			); 
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
	
	checkErrors = (state) => {
		const { lname, fname, nickname, birthDate, bio, occupation, touched } = state;
		const NICKNAME_ERR = 'Please provide your nickname';
		const FNAME_ERR = 'Please provide your firstname';
		const LNAME_ERR = 'Please provide your lastname';
		const MIN_AGE_ERR = 'You must be at least 18';
		const BIRTHDATE_ERR = 'Please provide your birthdate';
		const BIO_ERR = 'Please provide your bio';
		const OCCUPATION_ERR = 'Please provide your occupation';

		return {
			nickname: (!nickname && (touched.form || touched.nickname)) ? NICKNAME_ERR : '', 
			fname: (!fname && (touched.form || touched.fname)) ? FNAME_ERR : '', 
			lname: (!lname && (touched.form || touched.lname)) ? LNAME_ERR : '', 
			minAge:	!this.isAgeAllowed() && touched.birthDate ? MIN_AGE_ERR : '',
			birthDate: (touched.form || touched.birthDate)  && !birthDate ? BIRTHDATE_ERR : '',
			bio: (!bio && (touched.form || touched.bio)) ? BIO_ERR : '', 
			occupation: (!occupation && (touched.form || touched.occupation)) ? OCCUPATION_ERR : ''
		};		
	};


//	onSubmit = () => {
//		this.setState({ touched: {
//				...this.state.touched,
//				form: true
//			}
//		});
//		if (this.hasError(error))	
//			return ;
//		this.props.getProfile(this.state);
//	};



	/* Lifecycle functions */

	componentDidUpdate() {
	}

	render() {

		const { 
			bio,
			fname,
			lname,
			gender,
			orientation,
			birthDate,
			occupation,
			nickname,
			error
		} = this.state;


		return (
				<div className="l-edit-form">

					{/* Name */}
					
					<div className="c-form-input l-edit-form__first-input">
						<h5 className={(error.fname ? 'c-onb-form__error' : 'c-form-input__title')}>{error.fname ? error.fname : 'FIRSTNAME'}</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'fname', this.validate.fname)}
							type="text"
							placeholder="Firstname"
							value={fname}
						/>
					</div>
					
					<div className="c-form-input c-form-box__input">
						<h5 className={(error.lname ? 'c-onb-form__error' : 'c-form-input__title')}>{error.lname ? error.lname : 'LASTNAME'}</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'lname', this.validate.fname)}
							type="text"
							placeholder="Lastname"
							value={lname}
						/>
					</div>

					<div className="c-form-input c-form-box__input">
						<h5 className={(error.nickname ? 'c-onb-form__error' : 'c-form-input__title')}>{error.nickname ? error.nickname : 'NICKNAME'}</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'nickname', this.validate.fname)}
							type="text"
							placeholder="Nickname"
							value={nickname}
						/>
					</div>

	
					{/* Gender */}

					<div className="c-form-input l-edit-form__first-input">
						<h5 className="c-form-input__title">ORIENTATION</h5>
							<select 
								className="c-onb-form__input--select c-onb-form__input--select-long"
								onChange={(e) => this.handleOnChange(e, 'orientation', this.validate.orientation)} 
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
								onChange={(e) => this.handleOnChange(e, 'gender', this.validate.gender)} 
								defaultValue={this.state.gender}
							>
								<option value='woman'>Woman</option>
								<option value='man'>Man</option>
							</select>
					</div>		


					{/* Bio */}

					<div className="c-form-input l-edit-form__first-input">
						<h5 className={(error.occupation ? 'c-onb-form__error' : 'c-form-input__title')}>{error.occupation ? error.occupation : 'OCCUPATION'}</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'occupation', this.validate.occupation)}
							type="text"
							placeholder="Occupation"
							value={this.state.occupation}
						/>
					</div>

					<div className="c-form-input l-edit-form__first-input c-form-input--textarea">
						<h5 className={(error.bio ? 'c-onb-form__error' : 'c-form-input__title')}>{error.bio ? error.bio : 'BIO'}</h5>
						<Textarea
							className="c-form-input__content no-resize"
							onChange={(e) => this.handleOnChange(e, 'bio', this.validate.bio)}
							placeholder="Bio"
							value={this.state.bio}
							minRows={6}
							maxRows={6}
						/>
					</div>

					{/* Birthdate */}

					<BirthdatePicker 
						getTimestamp={this.getTimestamp} 
						birthDate={birthDate ? new Date(birthDate) : ''}
						className="l-edit-form__datepicker"
					/>
					<div className="c-onb-form__error c-onb-form__error--birthdate">
						<p>{error.birthDate}</p>
						<p>{error.minAge}</p>
					</div>

				</div>		

		);
	}
}

