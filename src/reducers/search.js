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
		min: 50,
		max: 400
	},
	tags: [],
	profiles: [],
	profilesCount: 0,
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
		case 'UPDATE_FILTERS_TAGS':
			return {
				...state,
				tags: action.tags
			};
		case 'UPDATE_FOCUSEDPROFILE':
			return {
				...state,
				focusedProfile: action.focusedProfile
			};
		case 'GET_PROFILES':
			return {
				...state,
				profiles: action.profiles
			};
		case 'GET_PROFILE':
			return {
				...state,
				profile: action.profile
			};
		case 'GET_PROFILES_COUNT':
			return {
				...state,
				profilesCount: action.profilesCount
			};
		default:
			return state;
	}
};
