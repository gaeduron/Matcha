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
