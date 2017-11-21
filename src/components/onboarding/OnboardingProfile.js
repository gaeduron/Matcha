import React from 'react';

export default class OnboardingProfile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			month: '0',
			fname: props.fname ? props.fname : '',
			lname: props.lname ? props.lname : ''
		};
	}
	// VALIDATE YEAR
	handleYear = (e) => {
		const year = Number(e.target.value);
		if (!year || year < 2020 && year > 1920) {
			this.setState({errors: ''});
			this.setState({year});
		}
		else 
			this.setState({errors: 'Wrong year'});
	};

	handleDay = (e) => {
		const day = e.target.value;
		this.setState({day});
	};

	handleMonth = (e) => {
		const month = e.target.value;
		this.setState({month});
	};

	handleNickname = (e) => {
		const nickname = e.target.value;
		this.setState({nickname});
	};

	handleFname = (e) => {
		const fname = e.target.value;
		//if (fname.length < 7)
		this.setState({fname});
	};

	handleLname = (e) => {
		const lname = e.target.value;
		this.setState({lname});
	};

	// VALIDE INPUTS 
	onSubmit = (e, props) => {
		e.preventDefault();
		this.props.getProfile(this.state);
	};

	render () {
		return (
			<div>
				<form onSubmit={this.onSubmit} onChange={this.log}>
					<p>Let's know each other</p>
					<input
						onChange={this.handleFname}
						type="text"
						placeholder="Firstname"
						autoFocus
						value={this.state.fname}
					/>
					<input
						onChange={this.handleLname}
						type="text"
						placeholder="Lastname"
						value={this.state.lname}
					/>
					<input 
						onChange={this.handleNickname}
						type="text"
						placeholder="Nickname"
					/>
					<p>Birthdate</p>
					<select value={this.state.month} onChange={this.handleMonth}>
						<option value='0'>Month</option>
						<option value='1'>Jan</option>
						<option value='2'>Feb</option>
						<option value='3'>Mar</option>
						<option value='4'>Apr</option>
						<option value='5'>May</option>
						<option value='6'>Jun</option>
						<option value='7'>Jul</option>
						<option value='8'>Aug</option>
						<option value='9'>Sep</option>
						<option value='10'>Oct</option>
						<option value='11'>Nov</option>
						<option value='12'>Dec</option>
					</select> 
					<input
						onChange={this.handleDay}
						type="text"
						type="number"
						name="day"
						placeholder="Day"
					/>
					<input
						onChange={this.handleYear}
						type="text"
						type="number"
						name="year"
						placeholder="Year"
					/>
					<input type="submit" value="Continue"/>
					<p>{this.state.errors}</p>
				</form>

			</div>
		);
	}
}
