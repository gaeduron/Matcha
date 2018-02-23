import { socket } from '../socket/socket';
import cookie from 'js-cookie';

export const getLikes = (likes) => ({
	type: 'GET_LIKES',
	likes
});

export const getVisits = (visits) => ({
	type: 'GET_VISITS',
	visits
});

export const sendInteraction = (emitMessage, data) => (dispatch, getState) => { 
	data.sessionToken = cookie.get('sessionToken');
	 dispatch({ 
		type: emitMessage,
		data
	});
};
