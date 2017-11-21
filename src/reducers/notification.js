export default (state = {}, action) => {
	switch (action.type) {
		case 'ADD_NOTIFICATION':
			return {
				...state,
				notification: action.notification
			};
		default:
			return state;
	}
};
