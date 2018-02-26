
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
				likes: action.likes	
			};
		default:
			return state;
	}
};
