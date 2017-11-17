import React from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../actions/auth';

export default class LoginPage extends React.Component {
	constructor() {
		super();

		this.state = {
			email: "",
			firstname: "",
			lastname: "",
			login: "",
			password: "",
			error: ""
		};
	};

	onEmailChange = (e) => {
		const email = e.target.value;
		this.setState(() => ({ email }));
	};
	onFirstnameChange = (e) => {
		const firstname = e.target.value;
		this.setState(() => ({ firstname }));
	};
	onLastnameChange = (e) => {
		const lastname = e.target.value;
		this.setState(() => ({ lastname }));
	};
	onLoginChange = (e) => {
		const login = e.target.value;
		this.setState(() => ({ login }));
	};
	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	};

	onSubmit = (e) => {
		e.preventDefault();

		if (!this.state.email || !this.state.firstname) {
			this.setState({
				error: 'Please write a description and the amount of the expense'
			})
		} else {
			this.setState({
				error: false
			})
			createAccount({
				email: this.state.email,
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				login: this.state.login,
				password: this.state.password,
			})
		}
	};

	render() {
		return (
			<div className="box-layout">
				<div className="box-layout__box">
					<h1 className="box-layout__title">Matcha</h1>
					<h3>Create Account</h3>
					<form action="" onSubmit={this.onSubmit}>
						<input
							className="text-input"
							placeholder="email"
							type="email"
							value={this.state.email}
							onChange={this.onEmailChange}
						/>
						<input
							className="text-input"
							placeholder="firstname"
							type="text"
							value={this.state.firstname}
							onChange={this.onFirstnameChange}
						/>
						<input
							className="text-input"
							placeholder="lastname"
							type="text"
							value={this.state.lastname}
							onChange={this.onLastnameChange}
						/>
						<input
							className="text-input"
							placeholder="login"
							type="text"
							value={this.state.login}
							onChange={this.onLoginChange}
						/>
						<input
							className="text-input"
							placeholder="password"
							type="password"
							value={this.state.password}
							onChange={this.onPasswordChange}
						/>
						<button className="button">Create</button>
					</form>
				</div>
			</div>
		)
	};
};
