import { socket } from '../socket/socket';
import cookie from 'js-cookie';

//export const startGetProfile = (profile) => {
//	profile.sessionToken = cookie.get('sessionToken');
//	socket.emit('getProfile', profile);
//};

export const step = () => ({
	type: 'STEP'
});

export const stepBack = () => ({
	type: 'STEPBACK'
});

export const saveUserData = (emitMessage, data) => (dispatch, getState) => { 
	data.sessionToken = cookie.get('sessionToken');
	 dispatch({ 
		type: emitMessage,
		data
	});
};

//export const saveGender = (genderState) => (dispatch, getState) => { 
//	genderState.sessionToken = cookie.get('sessionToken');
//	 dispatch({ 
//		type: 'SERVER/SAVE_GENDER',
//		data: genderState
//	});
//};
