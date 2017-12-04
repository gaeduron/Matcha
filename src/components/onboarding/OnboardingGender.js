import React from 'react';

export default class OnboardingGender extends React.Component {
		
	constructor(props) {
		super(props);

		this.state = {
			gender: this.props.gender ? this.props.gender : 'woman',
			orientation: this.props.orientation ? this.props.orientation : 'bisexual'
		};
	}
	
	handleOnChange = (e, name) => {
		const input = e.target.value;
		this.setState({ [name]: input });	
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.getGender(this.state);
	};  

	render () {
		return (
			<div>
				<p>Gender</p>
				<p>You are a</p>
				<form onSubmit={this.onSubmit}>
					<select 
						onChange={(e) => this.handleOnChange(e, 'orientation')} 
						defaultValue={this.state.orientation}
					>
						<option value='straight'>Straight</option>
						<option value='gay'>Gay</option>
						<option value='bisexual'>Bisexual</option>
					</select> 
					<select
						onChange={(e) => this.handleOnChange(e, 'gender')} 
						defaultValue={this.state.gender}
					>
						<option value='woman'>Woman</option>
						<option value='man'>Man</option>
					</select>
					<input type="submit" value="Continue"/>
				</form>

			</div>
		);
	}
}
