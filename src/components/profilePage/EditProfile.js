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
			tags: ["Creative", "Friendly", "Dog lover", "Meloman", "Problem Solver", "Egg Head"],
			squareHeight: 472,
		};
	}
	
	onStopEdit = () => {	
		const edit = false;
		this.setState(() => ({ edit }));
	}

  updateDimensions = () => {
    if(window.innerWidth <= 980 && window.innerWidth > 768) {
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
		} = this.props.user;


		return (
			<div className="c-user-desc">
				<button className="l-onb-nav__buttons-right c-button c-button--circle c-user-desc__edit" onClick={this.onEdit}>
					<i className="material-icons">save</i>
				</button>


				{/* Photo Uploader */}

				<UserPhotos 
					initialPhotos={initialPhotos} 
				/>


				{/* Profile form */}

						
					
				<div className="l-edit-profile__name">
					<div className="c-form-input c-form-box__first-input">
						<h5 className="c-form-input__title">FIRSTNAME</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'fname')}
							type="text"
							placeholder="Firstname"
							autoFocus
							value={fname}
						/>
					</div>
					
					<div className="c-form-input c-form-box__input">
						<h5 className="c-form-input__title">LASTNAME</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChange(e, 'lname')}
							type="text"
							placeholder="Lastname"
							value={lname}
						/>
					</div>

					<BirthdatePicker 
						getTimestamp={this.getTimestamp} 
						birthDate={birthDate ? new Date(birthDate) : ''}
					/>
					<div className="c-onb-form__error c-onb-form__error--birthdate">
					{/*
						<p>{error.birthDate}</p>
						<p>{error.minAge}</p>
					*/}
					</div>


				</div>		


				{/* Geolocation */}

				<div className="c-menu__map c-user-desc__map">

				</div>

				<div className="c-user-desc__text-container">
					<h2 className="c-user-desc__info c-user-desc__info--marged-bot">Tags</h2>
					<Tags tags={this.props.user.tags}/>
				</div>
				<div className="c-user-desc__text-container">
					<p className="c-user-desc__info c-user-desc__info--inline">Popularity</p>
					<h2 className="c-user-desc__score">5130</h2>
				</div>
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
