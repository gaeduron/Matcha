const defaultState = {
	sortBy: "distance",
	distance: {
		min: 5,
		max: 40
	},
	age: {
		min: 24,
		max: 34
	},
	popularity: {
		min: 5,
		max: 40
	},
	tags: [],
	profiles: [],
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'UPDATE_SORTBY':
			return {
				...state,
				sortBy: action.sortBy
			};
		case 'UPDATE_DISTANCE':
			return {
				...state,
				distance: action.distance
			};
		case 'UPDATE_AGE':
			return {
				...state,
				age: action.age
			};
		case 'UPDATE_POPULARITY':
			return {
				...state,
				popularity: action.popularity
			};
		case 'UPDATE_TAGS':
			return {
				...state,
				tags: action.tags
			};
		case 'GET_PROFILES':
			return {
				...state,
				profiles: action.profiles
			};
		default:
			return state;
	}
};
