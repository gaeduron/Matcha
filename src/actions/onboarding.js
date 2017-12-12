import { socket } from '../socket/socket';
import cookie from 'js-cookie';

export const startGetProfile = (profile) => {
	profile.sessionToken = cookie.get('sessionToken');
	socket.emit('getProfile', profile);
};

export const step = () => ({
	type: 'STEP'
});

export const stepBack = () => ({
	type: 'STEPBACK'
});

export const saveProfile = (profile) => (dispatch, getState) => { 
	profile.sessionToken = cookie.get('sessionToken');
	 dispatch({ 
		type: 'SERVER/SAVE_PROFILE',
		data: profile
	});
};
