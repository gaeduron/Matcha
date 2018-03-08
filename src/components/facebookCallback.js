import React from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'js-cookie';
import LoadingPage from './LoadingPage'
import { socket } from '../socket/socket';

export class FacebookCallback extends React.Component {
	constructor(props) {
		super(props);
	};

	saveCookie = (sessionToken) => {
		cookie.set('sessionToken', sessionToken);
		console.log(cookie.get('sessionToken'));
	};

	render() {
		const uid = this.props.match.params.sessionToken;
		this.saveCookie(uid);
		socket.emit('loginWithCookie', {
			sessionToken: cookie.get('sessionToken'),
			socketID: socket.id
		});
		return (
			<div>
				<LoadingPage />
			</div>
		); 
	}
};

export default FacebookCallback;
