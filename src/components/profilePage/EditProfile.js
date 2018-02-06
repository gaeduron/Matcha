import React from 'react';
import { connect } from 'react-redux';
import 'element-theme-default';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapWithAMarker from '../searchPage/map';
import { Tags } from './Tags';
import { history } from '../../routers/AppRouter';
import UserPhotos from '../photo/UserPhotos';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';

const findAge = (birthDate) => {
	let now = new Date(Date.now());
	let timeDiff = Math.abs(now.getTime() - birthDate.getTime());
	let age = Math.floor(timeDiff / (1000 * 3600 * 24 * 365)); 

	return age;
};

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
				<button className="l-onb-nav__buttons-left c-button c-button--circle c-user-desc__edit" onClick={this.onEdit}>
					<i className="material-icons">mode_edit</i>
				</button>


				{/* Photo Uploader */}

				<UserPhotos 
					initialPhotos={initialPhotos} 
				/>


				{/* Profile form */}

				<div className="c-user-desc__text-container">
					<h2 className="c-user-desc__name">{fname} {lname},</h2>
					<h2 className="c-user-desc__age">{findAge(birthDate)}</h2>
					<div className="c-user-desc__info-box">
						<p className="c-user-desc__info">{occupation}</p>
						<p className="c-user-desc__info">4 km away</p>
						<p className="c-user-desc__info">Straight, Male</p>
					</div>
						<p className="c-user-desc__text">Hi, I'm Benjamin, 
My early career as an entrepreneur allowed me to develop a wide array of business and digital related skills. 
Today, I'm a full-time student at 42, striving to become a valuable Software Engineer. 
If you find my profile interesting and if your company is both bold and innovative, I'd be glad to hear from you !</p>
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
