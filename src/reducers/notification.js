export default (state = {}, action) => {
	switch (action.type) {
		case 'REDIRECT':
			return {
				...state,
				redirect: action.redirect,
			};
		default:
			return state;
	}
};
