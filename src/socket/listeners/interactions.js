import { sendInteraction, updateLikes, updateVisits, updateMessages, updateOnlineUsers, updateBlocks } from '../../actions/interactions'; 
import { Redirect } from 'react-router-dom';

import {
	updateLocation	
} from '../../actions/user';

const interactionsListener = (dispatch, socket) => {

	socket.on('SERVER/CLICKED', (res) => {
		/* no need for res == 'visit', GET_VISITS is refreshed after a click on any notification */
		if (res == 'like') 
			dispatch(sendInteraction('SERVER/GET_LIKES', {}));
		if (res == 'chat')
			dispatch(sendInteraction('SERVER/GET_MESSAGES', {}));
	});

	socket.on('SERVER/SEEN', (res) => {
		if (res == 'news') {
			dispatch(sendInteraction('SERVER/GET_LIKES', {}));
			dispatch(sendInteraction('SERVER/GET_VISITS', {}));
		}
		if (res == 'chat')
			dispatch(sendInteraction('SERVER/GET_MESSAGES', {}));
	});

	socket.on('SERVER/BLOCK', (res) => {
		dispatch(sendInteraction('SERVER/GET_BLOCKS', {}));
	});

	socket.on('SERVER/GET_BLOCKS', (res) => {
		dispatch(updateBlocks(res.blocks, res.id));
	});

	socket.on('SERVER/ADD_LIKE', (res) => {
		dispatch(sendInteraction('SERVER/GET_LIKES', {}));
	});

	socket.on('SERVER/ADD_UNLIKE', (res) => {
		dispatch(sendInteraction('SERVER/GET_LIKES', {}));
	});

	socket.on('SERVER/GET_LIKES', (res) => {
		dispatch(updateLikes(res.likes));
	});

	socket.on('SERVER/ADD_VISIT', (res) => {
		dispatch(sendInteraction('SERVER/GET_VISITS', {}));
	});

	socket.on('SERVER/GET_VISITS', (res) => {
		dispatch(updateVisits(res.visits));
	});

	socket.on('SERVER/ADD_MESSAGE', (res) => {
		dispatch(sendInteraction('SERVER/GET_MESSAGES', {}));
	});

	socket.on('SERVER/GET_MESSAGES', (res) => {
		console.log('bien recu', res.messages);
		dispatch(updateMessages(res.messages));
	});

	socket.on('onlineUsers', (res) => {
		dispatch(updateOnlineUsers(res));
	});
};

export default interactionsListener;
