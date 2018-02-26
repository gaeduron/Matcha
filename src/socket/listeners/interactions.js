import { sendInteraction, updateLikes } from '../../actions/interactions'; 
import { Redirect } from 'react-router-dom';

import {
	updateLocation	
} from '../../actions/user';

const interactionsListener = (dispatch, socket) => {
	socket.on('SERVER/ADD_LIKE', (res) => {
		console.log('OKOK');
		dispatch(sendInteraction('SERVER/GET_LIKES', {}));
		//		dispatch(serverGetLikes());
	});

	//	socket.on('SERVER/GET_LIKES', (res) => {
	//		dispatch(updateLikes(res.likes));
	//	});
};

export default interactionsListener;
