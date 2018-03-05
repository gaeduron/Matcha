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

export const updateMessages = (messages) => ({
	type: 'UPDATE_MESSAGES',
	messages
});

export const updateOnlineUsers = (onlineUsers) => ({
	type: 'UPDATE_ONLINE_USERS',
	onlineUsers
});

export const updateBlocks = (blocks, id) => ({
	type: 'UPDATE_BLOCKS',
	blocks,
	id
});

export const sendInteraction = (emitMessage, data) => (dispatch, getState) => { 
	data.sessionToken = cookie.get('sessionToken');
	 dispatch({ 
		type: emitMessage,
		data
	});
};

/*
	sendInteraction('SERVER/SEEN', { type: 'chat | news' });

	sendInteraction('SERVER/CLICKED', {
		type: 'chat | like | visit',
		sender, (sender id) 
		newsId (only for like or visit)
	});

*/
