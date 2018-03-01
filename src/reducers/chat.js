const defaultState = {
	chatProfile: {
		id: 0,
		fname: '_______',
		lname: '_______',
		age: '__',
	},
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'UPDATE_CHAT_PROFILE':
			return {
				...state,
				chatProfile: action.chatProfile,
			};
		default:
			return state;
	}
};
