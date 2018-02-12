export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				uid: action.uid,
				isOnboarding: action.isOnboarding 
			};
		case 'COMPLETE_ONBOARDING':
			return {
				...state,
				isOnboarding: false
			};
		default:
			return state;
	}
};
