import { socket } from '../socket/socket';
import cookie from 'js-cookie';

export const updateLikes = (likes) => ({
	type: 'UPDATE_LIKES',
	likes
});

export const updateVisits = (visits) => ({
	type: 'UPDATE_VISITS',
	visits
});

export const updateOnlineUsers = (onlineUsers) => ({
	type: 'UPDATE_ONLINE_USERS',
	onlineUsers
});

export const sendInteraction = (emitMessage, data) => (dispatch, getState) => { 
	data.sessionToken = cookie.get('sessionToken');
	 dispatch({ 
		type: emitMessage,
		data
	});
};
