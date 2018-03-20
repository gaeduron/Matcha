import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'element-react';
import moment from 'moment';
import _ from 'lodash';
import 'element-theme-default';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapWithAMarker from '../searchPage/map';
import { Tags } from '../profilePage/Tags';
import { history } from '../../routers/AppRouter';
import { getProfileByID } from '../../actions/search';
import { LikeButton, ReportButton, BlockButton } from '../profilePage/likeButton';
import LoadingPage from '../LoadingPage';

// FOR TEST PURPOSE ONLY, TO MOVE IN ENV
const GOOGLE_GEOLOCATION_API_KEY = 'AIzaSyC3VByoAFwfYTsXvC5GgS0F6mEiJuoku2Y';
//AIzaSyC2Z8zLwy0uT8hd8qyBgfMmoqpKJRZwRkI

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
			like: false,
			reported: false,
			blocked: false,
			squareHeight: 472,
		};
	}

    onEdit = (id) => history.replace(`/edit-profile/${id}`);
	onStopEdit = () => this.setState({ edit: false });
	onLike = () => this.setState({ like: true });
	onUnlike = () => this.setState({ like: false });
	onReport = () => this.setState({ reported: true });
	onUnreport = () => this.setState({ reported: false });
	onBlock = () => this.setState({ blocked: true });
	onUnblock = () => this.setState({ blocked: false });

	updateDimensions = () => {
		if(window.innerWidth > 1550) {
			this.setState({ squareHeight: 472, description: "visible" });
		} else if (window.innerWidth > 1235) {
			this.setState({ squareHeight: 320, description: "visible" });
		} else {
			this.setState({ description: "hidden" });
		}
	}

	componentDidUpdate = (prevProps) => {
		if (prevProps.profile != this.props.profile) {
			this.props.getProfileByID(this.props.profile);	
		}
	}

	componentDidMount = () => {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions);
		if (this.props.profile) {
			this.props.getProfileByID(this.props.profile);
		}
	}	

	componentWillUnmount = () => window.removeEventListener("resize", this.updateDimensions);

	formatPhoto = (url) => {
		url = url.replace(/v[0-9]+\//i, "g_face,c_thumb,w_40,h_40,r_max/e_shadow/");
		url = url.replace(/\.[0-9a-z]+$/i, ".png");
		return url;
	}

	formatOrientation = (orientation) => {
		if (orientation === 'hetero' || orientation === 'Hetero') {
			return 'Straight';
		} else if (orientation === 'bi' || orientation === 'Bi') {
			return 'Bisexual';
		}
		return 'Gay';
	}

	formatUser = (profile) => {
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
	
	formatFetchedProfile = (profile) => {
		return {
			lat: parseFloat(profile.latitude),
			lon: parseFloat(profile.longitude),
			photo: this.formatPhoto(JSON.parse(profile.photos)[0]),
			photos: JSON.parse(profile.photos).filter(x => x),
			fname: _.capitalize(profile.firstname),
			lname: _.capitalize(profile.lastname),
			age: moment().diff(profile.birthdate, 'years'),
			occupation: profile.occupation,
			distance: 0,
			bio: profile.bio,
			tags: profile.tags,
			score: profile.score,
			orientation: this.formatOrientation(profile.sexualOrientation),
			gender: _.capitalize(profile.sex),
		};
	}

	getUserProfile = (profile, fetchedProfile) => {
		const profileID = this.props.profile;
		if (profileID && fetchedProfile) {
			return this.formatFetchedProfile(fetchedProfile);
		} else {
			return this.formatUser(profile);
		}
	}
	
	render() {
		const focusedProfile = false;
		const user = this.getUserProfile(this.props.user, this.props.fetchedProfile);
		
		if (this.props.profile) {
			if (!this.props.fetchedProfile) {
				return (
					<LoadingPage/>
				);
			}
			if (this.props.fetchedProfile.id != this.props.profile) {
				return (
					<LoadingPage/>
				);
			}
		}

		return (
			<div className={`c-user-desc--chat ${this.state.description == "hidden" ? "l-chat__hide-desc" : ""}`}>
				{!this.props.profile &&
					<button
						className="l-onb-nav__buttons-left c-button c-button--circle c-user-desc__edit"
						onClick={() => this.onEdit(this.props.user.nickname)}>
						<i className="material-icons">mode_edit</i>
					</button>
				}
				{this.props.profile &&
					<LikeButton liked={this.state.like} onLike={this.onLike} onUnlike={this.onUnlike} />
				}
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
				{this.props.profile &&
					<div className="c-user-desc__report-block-wrap">
						<ReportButton
							reported={this.state.reported}
							onReport={this.onReport}
							onUnreport={this.onUnreport}
						/>
						<BlockButton
							blocked={this.state.blocked}
							onBlock={this.onBlock}
							onUnblock={this.onUnblock}
						/>
					</div>
				}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	getProfileByID: (data) => dispatch(getProfileByID({ profileID: data })),
});

const mapStateToProps = (state) => {
	return {
		user: state.user,
		fetchedProfile: state.search.profile,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDescription);
