import React from 'react';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';
import BirthdatePicker from '../utils/BirthdatePicker';
import OnboardingNav from './OnboardingNav';

export default class OnboardingBio extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			bio: props.bio ? props.bio : '',
			occupation: props.occupation ? props.occupation : '',
			touched: {
				bio: false,
				occupation: false,
				form: false
			}
		};
	}

	handleOnChangeBio = (e) => {
		const input = e.target.value;

		if (input.length < 281) {
			this.setState({ 
				bio: input, 
				touched: { 
					...this.state.touched,
					bio: true
				}	
			});	
		}	
	};

	handleOnChangeOccupation = (e) => {
		const input = e.target.value;
		if (input.length < 51) {
			this.setState({ 
				occupation: input, 
				touched: { 
					...this.state.touched,
					occupation: true
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

	validate = (state) => {
		const { bio, occupation, touched} = state;
		const BIO_ERR = 'Please provide your bio';
		const OCCUPATION_ERR = 'Please provide your occupation';

		return {
			bio: (!bio && (touched.form || touched.bio)) ? BIO_ERR : '', 
			occupation: (!occupation && (touched.form || touched.occupation)) ? OCCUPATION_ERR : ''

		};		
	};

	hasError = (errors) => {
		const { bio, occupation } = this.state;

		if (!bio || !occupation)	
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
		this.props.getBio(this.state);
	};


	render () {

		let error = this.validate(this.state);

		return (
			<div className="l-onb-form__container">
				<form>
					<h4 className="c-onb-form__title">WHAT ARE YOU DOING ALL DAY ?</h4>

					<div className="c-form-input c-form-box__first-input">
						<h5 className={(error.occupation ? 'c-onb-form__error' : 'c-form-input__title')}>{error.occupation ? error.occupation : 'OCCUPATION'}</h5>
						<input
							className="c-form-input__content"
							onChange={(e) => this.handleOnChangeOccupation(e)}
							type="text"
							placeholder="Occupation"
							autoFocus
							value={this.state.occupation}
						/>
					</div>

					<h4 className="c-onb-form__title">BIO</h4>

					<div className="c-form-input c-form-box__first-input c-form-input--textarea">
						<h5 className={(error.bio ? 'c-onb-form__error' : 'c-form-input__title')}>{error.bio ? error.bio : 'BIO'}</h5>
						<Textarea
							className="c-form-input__content no-resize"
							onChange={(e) => this.handleOnChangeBio(e)}
							placeholder="Bio"
							value={this.state.bio}
							minRows={8}
							maxRows={8}
						/>
					</div>
				</form>
				<OnboardingNav action={() => this.onSubmit(error)} />

			</div>
		);
	}
}
