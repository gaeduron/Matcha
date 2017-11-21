import React from 'react';

export default class OnboardingGender extends React.Component {

	render () {
		return (
			<div>
				<p>Gender</p>
				<p>You are a</p>
				<form onSubmit={this.props.getGender}>
					<select defaultValue="bisexual">
						<option value='straight'>Straight</option>
						<option value='gay'>Gay</option>
						<option value='bisexual'>Bisexual</option>
					</select> 
					<select>
						<option selected value='woman'>Woman</option>
						<option value='man'>Man</option>
					</select>
					<input type="submit" value="Continue"/>
				</form>

			</div>
		);
	}
}
