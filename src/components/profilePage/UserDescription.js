import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'element-react';
import moment from 'moment';
import _ from 'lodash';
import 'element-theme-default';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapWithAMarker from '../searchPage/map';
import { Tags } from './Tags';
import { history } from '../../routers/AppRouter';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';
//AIzaSyC2Z8zLwy0uT8hd8qyBgfMmoqpKJRZwRkI

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

export class UserDescription extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			edit: 'false',
			tags: ["Creative", "Friendly", "Dog lover", "Meloman", "Problem Solver", "Egg Head"],
			squareHeight: 472,
		};
	}

    onEdit = () => history.replace('/profile/edit');

	//onEdit = () => {	
	//	const edit = true;
	//	this.setState(() => ({ edit }));
	//}
	
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


	formatPhoto = (url) => {
		url = url.replace(/v[0-9]+\//i, "g_face,c_thumb,w_40,h_40,r_max/e_shadow/");
		url = url.replace(/\.[0-9a-z]+$/i, ".png");
		return url;
	}

	getUserProfile = (profile) => {
		return {
			lat: parseFloat(profile.location.latitude),
			lon: parseFloat(profile.location.longitude),
			photo: this.formatPhoto(profile.photos[0]),
			photos: profile.photos.filter(x => x),
			fname: _.capitalize(profile.fname),
			lname: _.capitalize(profile.lname),
			age: moment().diff(profile.birthDate, 'years'),
			occupation: profile.occupation,
			distance: 0,
			bio: profile.bio,
			tags: profile.tags,
			score: profile.score,
			orientation: _.capitalize(profile.orientation),
			gender: _.capitalize(profile.gender),
		};
	}
i
	render() {
		const focusedProfile = false;
		const user = this.getUserProfile(this.props.user);
		return (
			<div className="c-user-desc">
				<button className="l-onb-nav__buttons-left c-button c-button--circle c-user-desc__edit" onClick={this.onEdit}>
					<i className="material-icons">mode_edit</i>
				</button>
				<Carousel height={`${this.state.squareHeight}px`} trigger="click" interval="10000" arrow="always">
					{
						user.photos.map((item, index) => {
							return (
								<Carousel.Item key={index}>
									<img src={item} alt="" />
								</Carousel.Item>
							)
						})
					}
				</Carousel>
				<div className="c-user-desc__text-container">
					<h2 className="c-user-desc__name">{`${user.fname} ${user.lname},`}</h2>
					<h2 className="c-user-desc__age">{`${user.age}`}</h2>
					<div className="c-user-desc__info-box">
						<p className="c-user-desc__info">{`${user.occupation}`}</p>
						<p className="c-user-desc__info">{`${user.distance}`} km away</p>
						<p className="c-user-desc__info">{`${user.orientation}, ${user.gender}`}</p>
					</div>
						<p className="c-user-desc__text">{`${user.bio}`}</p>
				</div>
				<div className="c-menu__map c-user-desc__map">
					<MapWithAMarker
					  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_GEOLOCATION_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
					  loadingElement={<div style={{ height: `100%` }} />}
					  containerElement={<div style={{ height: `100%` }} />}
					  mapElement={<div style={{ height: `100%` }} />}
					  zoom={12}
					  me={user}
					  profile={focusedProfile}
					/>
				</div>
				<div className="c-user-desc__text-container">
					<h2 className="c-user-desc__info c-user-desc__info--marged-bot">Tags</h2>
					<Tags tags={user.tags}/>
				</div>
				<div className="c-user-desc__text-container">
					<p className="c-user-desc__info c-user-desc__info--inline">Popularity</p>
					<h2 className="c-user-desc__score">{`${user.score}`}</h2>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, undefined)(UserDescription);
