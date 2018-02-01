import React from 'react';
import { startLogout } from '../../actions/auth';

export default class OnboardingClose extends React.Component {

	render () {

		return (
			<button className="c-button__close" onClick={startLogout}>
				<i className="material-icons">close</i>
			</button> 	
		);
	}
}


