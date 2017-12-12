import FB from '../components/onboarding/FBData';

const defaultState = {
	fname: FB.firstname,
	lname: FB.lastname,
	gender: FB.gender,
	tags: FB.likes,
	photos: FB.photos,
	orientation: 'bisexual',
	birthDate: '',
	location: {
		latitude: 0,
		longitude: 0
	}
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'UPDATE_FNAME':
			return {
				...state,
				fname: action.fname	
			};
		case 'UPDATE_LNAME':
			return {
				...state,
				lname: action.lname	
			};
		case 'UPDATE_GENDER':
			return {
				...state,
				gender: action.gender
			};
		case 'UPDATE_TAGS':
			return {
				...state,
				tags: action.tags
			};
		case 'UPDATE_PHOTOS':
			return {
				...state,
				photos: action.photos
			};
		case 'UPDATE_ORIENTATION':
			return {
				...state,
				orientation: action.orientation	
			};
		case 'UPDATE_BIRTHDATE':
			return {
				...state,
				birthDate: action.birthDate	
			};
		case 'UPDATE_LOCATION':
			return {
				...state,
				location: action.location	
			};
		default:
			return state;
	}
};
