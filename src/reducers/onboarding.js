const defaultState = {
	step: 4
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'STEP':
			return { step: state.step + 1 };
		case 'STEPBACK':
			return { step: state.step - 1 };
		default:
			return state;
	}
};
