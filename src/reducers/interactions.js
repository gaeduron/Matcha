
const defaultState = {
	likes: [],
	visits: []
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'UPDATE_LIKES':
			return {
				...state,
				likes: action.likes	
			};
		case 'UPDATE_VISITS':
			return {
				...state,
				visits: action.visits	
			};
		case 'UPDATE_ONLINE_USERS':
			return {
				...state,
				onlineUsers: action.onlineUsers	
			};
		default:
			return state;
	}
};
