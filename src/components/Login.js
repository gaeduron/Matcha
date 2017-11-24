import React from 'react';
import { connect } from 'react-redux';
import { startLogin, passwordReset } from '../actions/auth';

export class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			error: ""
		};
	};

	onEmailChange = (e) => {
		const email = e.target.value;
		this.setState(() => ({ email }));
	};
	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	};

	onSubmit = (e) => {
		e.preventDefault();

		startLogin({
			email: this.state.email,
			password: this.state.password,
		})
	};
	
	onSubmitPasswordReset = (e) => {
		e.preventDefault();

		passwordReset({
			email: this.state.email,
		});
	};

	render() {
		return (
			<div className="box-layout__box">
				<h1 className="box-layout__title">Matcha</h1>
				<h3>Login</h3>
				<p>{this.props.notif}</p>
				<form action="" onSubmit={this.onSubmit}>
					<input
						className="text-input"
						placeholder="email or login"
						type="text"
						value={this.state.email}
						onChange={this.onEmailChange}
					/>
					<input
						className="text-input"
						placeholder="password"
						type="password"
						value={this.state.password}
						onChange={this.onPasswordChange}
					/>
					<button className="button">Login</button>
				</form>
				<form action="" onSubmit={this.onSubmitPasswordReset}>
					<button className="button">Login</button>
				</form>
			</div>
		)
	};
};

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification	
	}
};

export default connect(mapStateToProps, undefined)(Login);
