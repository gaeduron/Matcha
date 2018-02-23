
const defaultState = {
	likes: [],
	visits: []
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'GET_LIKES':
			return {
				...state,
				likes: action.likes	
			};
		case 'GET_VISITS':
			return {
				...state,
				likes: action.likes	
			};
		default:
			return state;
	}
};
