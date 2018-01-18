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
			this.props.redirect ? (<Redirect to={this.props.redirect} />) :
			(<div>
			<div className="o-background-image-overlay" />
			<div className="o-background-image" />
				
			<div className="l-wrapper__landing">
				<h3 className="o-subtitle">PASSWORD RESET</h3>
			</div>

			<div
				className="l-landing__buttons"
			>
				<div className="c-form-box">
					<i
						className="material-icons c-form-box__close"
						onClick={this.onCloseButtonClick}
					>
					close
					</i>
							<h4 className="c-form-box__title">CHOOSE A NEW PASSWORD</h4>
							<form action="" onSubmit={this.onSubmit}>
								<div className="c-form-input c-form-box__first-input">
									<h5 className="c-form-input__title">PASSWORD</h5>
									<input
										type="password"
										className="c-form-input__content"
										placeholder="*********"
										value={this.state.password}
										onChange={this.onPasswordChange}
									/>
								</div>
								<div className="c-form-input c-form-box__input">
									<h5 className="c-form-input__title">PASSWORD</h5>
									<input
										type="password"
										className="c-form-input__content"
										placeholder="********"
										value={this.state.passwordConfirmation}
										onChange={this.onPasswordConfirmationChange}
									/>
								</div>
								<button className="c-form-box__button">RESET</button>
							</form>
						</div>
					</div>
				</div>)
		/*		<div className="box-layout">
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
				</div>*/
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

