
const defaultState = {
	likes: [],
	messages: [],
	visits: [],
	matches: [],
	onlineUsers: [],
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'UPDATE_LIKES':
			return {
				...state,
				likes: action.likes	
			};
		case 'UPDATE_MATCHES':
			return {
				...state,
				matches: action.matches	
			};
		case 'UPDATE_VISITS':
			return {
				...state,
				visits: action.visits	
			};
		case 'UPDATE_MESSAGES':
			return {
				...state,
				messages: action.messages 	
			};
		case 'UPDATE_ONLINE_USERS':
			return {
				...state,
				onlineUsers: action.onlineUsers	
			};
		case 'UPDATE_BLOCKS':
			const blocked = action.blocks
				.filter(x => x.sender == action.id)
				.map(x => x.receiver);
			const blockedMe = action.blocks
				.filter(x => x.receiver == action.id)
				.map(x => x.sender);
			return {
				...state,
				blocked,
				blockedMe
			};
		default:
			return state;
	}
};
