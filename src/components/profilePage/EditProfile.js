import React from 'react';
import { connect } from 'react-redux';
import 'element-theme-default';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapWithAMarker from '../searchPage/map';
import { Tags } from './Tags';
import { history } from '../../routers/AppRouter';
import UserPhotos from '../photo/UserPhotos';
import BirthdatePicker from '../utils/BirthdatePicker';
import Textarea from 'react-textarea-autosize';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';


const style = () => {
	const { innerWidth } = window;

	switch (true) {
		case (innerWidth < 321): 
			return { width: 270 }; 
			break;
		case (innerWidth < 769): 
			return { width: 300 }; 
			break;
		default:	
			return { width: 330 }; 
	}
};

export class EditProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fname: props.user.fname ? props.user.fname : '',
			lname: props.user.lname ? props.user.lname : '',
			nickname: props.user.nickname ? props.user.nickname : '',
			birthDate: props.user.birthDate ? props.user.birthDate : '',
			gender: props.user.gender ? props.user.gender : 'woman',
			orientation: props.user.orientation ? props.user.orientation : 'bisexual',
			tags: props.user.tags ? props.user.tags : [],
			bio: props.user.bio ? props.user.bio : '',
			occupation: props.user.occupation ? props.user.occupation : '',
			photos: props.user.photos ? props.user.photos : '',
			touched: {
				fname: false,
				lname: false,
				nickname: false,
				birthDate: false,
				bio: false,
				occupation: false,
				form: false
			}
		};
	}

	validate = {
		fname: (input) => (!input || input.match(/^[a-z][a-z \-]*$/i) && input.length < 255),
		gender: (input) => (!input || input == 'man' || input == 'woman'),
		orientation: (input) => (!input || input == 'straight' || input == 'gay' || input == 'bisexual')
	};
	
	handleOnChange = (e, name, validate) => {
		const input = e.target.value;

		if (validate(input)) {
			this.setState({ 
				[name]: input, 
				touched: { 
					...this.state.touched,
					[name]: true
				}	
			});	
		}
	};


	/* Lifecycle functions */

	updateDimensions = () => {
		if (window.innerWidth <= 980 && window.innerWidth > 768) {
			this.setState({ squareHeight: 320 });
		} else if ( window.innerWidth <= 768 && window.innerWidth > 472) {
			this.setState({ squareHeight: 472 });
		} else if ( window.innerWidth <= 472 && window.innerWidth > 424) {
			this.setState({ squareHeight: 425 });
		} else if ( window.innerWidth <= 424 && window.innerWidth > 374) {
			this.setState({ squareHeight: 375 });
		} else if ( window.innerWidth <= 374) {
			this.setState({ squareHeight: 320 });
		} else {
			this.setState({ squareHeight: 472 });
		}
	}

	onPrev = () => history.replace('/profile/user-id');

	/* componentDidUpdate => debouncer les inputs et socket emit les modifs a chaque update */

	componentDidMount = () => {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount = () => {
		window.removeEventListener("resize", this.updateDimensions);
	}

	render() {

		const { 
			photos: initialPhotos,
			tags,
			bio,
			fname,
			lname,
			gender,
			orientation,
			birthDate,
			occupation,
			location,
			nickname	
		} = this.state;

		const error = {};

		return (
			<div className="c-user-desc c-user-desc--edit">


				{/*********** NAV MENU ***********/}

				<div className="c-edit-menu">
					<button className="l-onb-nav__buttons-right c-button c-button--circle" onClick={this.onPrev}>
						<i className="material-icons">chevron_left</i>
					</button>
					<p>EDIT PROFILE</p>
				</div>


				{/*********** PHOTO UPLOADER ***********/}

				<UserPhotos 
					initialPhotos={initialPhotos} 
				/>


				{/*********** PROFILE FORM ***********/}
				
				<div className="l-edit-form">

					{/* Name */}
					
					<div className="c-form-input l-edit-form__first-input">
						<h5 className="c-form-input__title">FIRSTNAME</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'fname', this.validate.fname)}
							type="text"
							placeholder="Firstname"
							value={fname}
						/>
					</div>
					
					<div className="c-form-input c-form-box__input">
						<h5 className="c-form-input__title">LASTNAME</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'lname', this.validate.fname)}
							type="text"
							placeholder="Lastname"
							value={lname}
						/>
					</div>

						
					{/* Birthdate */}

					<BirthdatePicker 
						getTimestamp={this.getTimestamp} 
						birthDate={birthDate ? new Date(birthDate) : ''}
						className="l-edit-form__datepicker"
					/>
					<div className="c-onb-form__error c-onb-form__error--birthdate">
					{/*
						<p>{error.birthDate}</p>
						<p>{error.minAge}</p>
					*/}
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
								onChange={(e) => this.handleOnChange(e, 'gender', gender)} 
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
							onChange={(e) => this.handleOnChangeOccupation(e)}
							type="text"
							placeholder="Occupation"
							value={this.state.occupation}
						/>
					</div>

					<div className="c-form-input l-edit-form__first-input c-form-input--textarea">
						<h5 className={(error.bio ? 'c-onb-form__error' : 'c-form-input__title')}>{error.bio ? error.bio : 'BIO'}</h5>
						<Textarea
							className="c-form-input__content no-resize"
							onChange={(e) => this.handleOnChangeBio(e)}
							placeholder="Bio"
							value={this.state.bio}
							minRows={6}
							maxRows={6}
						/>
					</div>

				</div>		


				{/******** GEOLOCATION *********/}


			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
		user: state.user
	};
};

export default connect(mapStateToProps, undefined)(EditProfile);
