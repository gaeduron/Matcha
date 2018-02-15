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
