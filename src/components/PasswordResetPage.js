import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { passwordReset } from '../actions/auth';

export class PasswordResetPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: "",
			passwordConfirmation: "",
		};
	};

	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	};
	onPasswordConfirmationChange = (e) => {
		const passwordConfirmation = e.target.value;
		this.setState(() => ({ passwordConfirmation }));
	};

	onSubmit = (e) => {
		e.preventDefault();

		passwordReset({
			password: this.state.password,
			passwordConfirmation: this.state.passwordConfirmation,
			passwordResetToken: this.props.match.params.token,
		})
	};

	render() {
		return (
			redirect ? (<Redirect to="/dashboard" />) :
			(<div className="box-layout">
				<div className="box-layout__box">
					<h1 className="box-layout__title">Password Reset</h1>
					<h3>Enter your new password</h3>
					<form action="" onSubmit={this.onSubmit}>
						<input
							className="text-input"
							placeholder="password"
							type="password"
							value={this.state.password}
							onChange={this.onPasswordChange}
						/>
						<input
							className="text-input"
							placeholder="password confirmation"
							type="password"
							value={this.state.passwordConfirmation}
							onChange={this.onPasswordConfirmationChange}
						/>
						<button className="button">Reset</button>
					</form>
				</div>
			</div>)
		)
	};
};

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
		redirect: state.notif.redirect,
	}
};

export default connect(mapStateToProps, undefined)(PasswordResetPage);

