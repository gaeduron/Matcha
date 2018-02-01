import React from 'react';
import { connect } from 'react-redux';
import { createAccount, startLogin, passwordResetEmail } from '../actions/auth';
import Login from './Login';

export class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			formRegister: 'hidden',
			formConnect: 'hidden',
		};
	}

	onEmailChange = (e) => {
		const email = e.target.value;
		this.setState(() => ({ email }));
	}
	onLoginChange = (e) => {
		const login = e.target.value;
		this.setState(() => ({ login }));
	}
	onPasswordChange = (e) => {
		const password = e.target.value;
		this.setState(() => ({ password }));
	}

	onRegisterButtonClick = () => {
		const formRegister = 'visible';
		this.setState(() => ({ formRegister }));
	}
	
	onConnectButtonClick = () => {
		const formConnect = 'visible';
		this.setState(() => ({ formConnect }));
	}

	onCloseButtonClick = () => {
		const formRegister = 'hidden';
		const formConnect = 'hidden';
		this.setState(() => ({ formRegister, formConnect }));
	}

	onSubmit = (e) => {
		e.preventDefault();

		createAccount({
			email: this.state.email,
			password: this.state.password,
			});
	}

	onConnect = (e) => {
    	e.preventDefault();

		startLogin({
        	emailOrLogin: this.state.email,
        	password: this.state.password,
		})
	}
	
	onPasswordReset = (e) => {
		e.preventDefault();

		passwordResetEmail({
			emailOrLogin: this.state.email,
		});
	};

	render() {
		return (
			<div>
				<div className="o-background-image-overlay" />
				<div className="o-background-image" />
				<button
					className="l-corner-button o-button--line"
					onClick={this.onConnectButtonClick}
				>
					CONNECT
				</button>

				<div className="l-wrapper__landing">
					<h1 className="o-title">MATCHA</h1>
					<h3 className="o-subtitle">LOVE IS WAITING FOR YOU</h3>
					<div className="l-landing__buttons">
						<button className="o-button--fb o-button--large">
							CONNECT WITH FACEBOOK
						</button>
						<button
							className="
								l-landing__buttons-margin
								o-button--line
								o-button--large"
							onClick={this.onRegisterButtonClick}
						>
							REGISTER
						</button>
					</div>

					<div
						style={{ visibility: this.state.formRegister }}
						className={ "l-landing__form " + this.state.formRegister }
					>
						<div className="c-form-box">
							<i
								className="material-icons c-form-box__close"
								onClick={this.onCloseButtonClick}
							>
							close
							</i>
							<h4 className="c-form-box__title">REGISTER</h4>
							<form action="" onSubmit={this.onSubmit}>
								<div className="c-form-input c-form-box__first-input">
									<h5 className="c-form-input__title">EMAIL</h5>
									<input
										type="email"
										className="c-form-input__content"
										placeholder="exemple@domain.com"
										value={this.state.email}
										onChange={this.onEmailChange}
									/>
								</div>
								<div className="c-form-input c-form-box__input">
									<h5 className="c-form-input__title">PASSWORD</h5>
									<input
										type="password"
										className="c-form-input__content"
										placeholder="********"
										value={this.state.password}
										onChange={this.onPasswordChange}
									/>
								</div>
								<button className="c-form-box__button">SEND</button>
							</form>
						</div>
					</div>

					<div
						className={ "l-landing__form " + this.state.formConnect }
					>
						<div className="c-form-box c-form-box--long">
							<i
								className="material-icons c-form-box__close"
								onClick={this.onCloseButtonClick}
							>
							close
							</i>
							<h4 className="c-form-box__title">CONNECT</h4>
							<form action="" onSubmit={this.onConnect}>
								<div className="c-form-input c-form-box__first-input">
									<h5 className="c-form-input__title">EMAIL OR LOGIN</h5>
									<input
										type="text"
										className="c-form-input__content"
										placeholder="exemple@domain.com"
										value={this.state.email}
										onChange={this.onEmailChange}
									/>
								</div>
								<div className="c-form-input c-form-box__input">
									<h5 className="c-form-input__title">PASSWORD</h5>
									<input
										type="password"
										className="c-form-input__content"
										placeholder="********"
										value={this.state.password}
										onChange={this.onPasswordChange}
									/>
								</div>
								<button className="c-form-box__button">CONNECT</button>
								<h5
									className="c-form-box__clickable-text"
									onClick={this.onPasswordReset}
								>
									forgot your password ?
								</h5>
							</form>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notif: state.notif.notification,
	};
};

export default connect(mapStateToProps, undefined)(LoginPage);

