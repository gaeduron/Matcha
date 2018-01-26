import React from 'react';
import { connect } from 'react-redux';
import { stepBack } from '../../actions/onboarding';

export class OnboardingNav extends React.Component {

	render () {

		const step = this.props.step;

		return (
			<div className="l-onb-nav">
					<div className="l-onb-nav__buttons">
						{ step !== 0 && 
							<button className="l-onb-nav__buttons-left c-button c-button--circle" onClick={this.props.stepBack}>
								<i className="material-icons">chevron_left</i>
							</button> 	
						}
						<button className="c-button" onClick={this.props.action}>
							<div>CONTINUE&nbsp;&nbsp;</div>
							<div><i className="material-icons">chevron_right</i></div>
						</button>
					</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	stepBack: () => dispatch(stepBack())
});

const mapStateToProps = (state, props) => ({
	step: state.onboarding.step
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingNav);
