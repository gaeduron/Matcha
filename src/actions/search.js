export const updateProfiles = profiles => {
	return {
		type: 'GET_PROFILES',
		profiles
	}
};

export const updateFocusedProfile = focusedProfile => {
	return {
		type: 'UPDATE_FOCUSEDPROFILE',
		focusedProfile
	}
};

export const updateProfilesCount = profilesCount => {
	return {
		type: 'GET_PROFILES_COUNT',
		profilesCount
	}
};

export const updateSortBy = sortBy => ({
	type: 'UPDATE_SORTBY',
	sortBy
});
export const updateDistance = distance => ({
	type: 'UPDATE_DISTANCE',
	distance
});
export const updateAge = age => ({
	type: 'UPDATE_AGE',
	age
});
export const updatePopularity = popularity => ({
	type: 'UPDATE_POPULARITY',
	popularity
});
export const updateFiltersTags = tags => ({
	type: 'UPDATE_FILTERS_TAGS',
	tags
});

export const getProfileByID = (data) => ({
	type: 'SERVER/GET_PROFILE_BY_ID',
	data,
});

export const reportProfile = (data) => ({
	type: 'SERVER/REPORT_PROFILE',
	data,
});

export const updateProfile = profile => ({
	type: 'GET_PROFILE',
	profile,
});
