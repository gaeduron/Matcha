import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'element-react';
import 'element-theme-default';
import ChipInput from 'material-ui-chip-input';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapWithAMarker from '../searchPage/map';

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
			tags: ["tag1", "tasty tag", "hello world"],
		};
	}

	onEdit = () => {	
		const edit = true;
		this.setState(() => ({ edit }));
	}
	
	onStopEdit = () => {	
		const edit = false;
		this.setState(() => ({ edit }));
	}

	render() {
		return (
			<div className="c-user-desc">
				<Carousel height="472px" trigger="click" interval="10000" arrow="always">
					{
						[1,2,3,4,5].map((item, index) => {
							return (
								<Carousel.Item key={index}>
									<img src="http://image.ibb.co/dKurob/Screen_Shot_2018_01_22_at_5_33_26_PM.png" alt="" />
								</Carousel.Item>
							)
						})
					}
				</Carousel>
				<div className="c-user-desc__text-container">
					<h2 className="c-user-desc__name">Benjamin Duron,</h2>
					<h2 className="c-user-desc__age">27</h2>
					<div className="c-user-desc__info-box">
						<p className="c-user-desc__info">Software Engineering student at 42</p>
						<p className="c-user-desc__info">4 km away</p>
						<p className="c-user-desc__info">Straight, Male</p>
					</div>
						<p className="c-user-desc__text">Hi, I'm Benjamin, 
My early career as an entrepreneur allowed me to develop a wide array of business and digital related skills. 
Today, I'm a full-time student at 42, striving to become a valuable Software Engineer. 
If you find my profile interesting and if your company is both bold and innovative, I'd be glad to hear from you !</p>
				</div>
				<div className="c-menu__map">
					<MapWithAMarker
					  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_GEOLOCATION_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
					  loadingElement={<div style={{ height: `100%` }} />}
					  containerElement={<div style={{ height: `400px` }} />}
					  mapElement={<div style={{ height: `100%` }} />}
					  zoom={12}
					/>
				</div>
				<h2 className="c-user-desc__info">Tags</h2>
				<MuiThemeProvider>
					<div className="c-menu__tags">
						<ChipInput
							value={this.state.tags}
							underlineFocusStyle={{
								borderBottom: '2px solid #fc2b68'
							}}
							style={style()}
							disabled={true}
						/>
					</div>
				</MuiThemeProvider>
				<p className="c-user-desc__info">Popularity</p>
				<h2 className="c-user-desc__score">5130</h2>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	};
};

export default connect(mapStateToProps, undefined)(UserDescription);
