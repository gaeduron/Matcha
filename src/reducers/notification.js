export default (state = {}, action) => {
	switch (action.type) {
		case 'ADD_NOTIFICATION':
			return {
				...state,
				notification: action.notification,
			};
		case 'REDIRECT':
			return {
				...state,
				redirect: action.redirect,
			};
		default:
			return state;
	}
};
