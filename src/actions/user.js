/* User actions */

export const updateFname = fname => ({
	type: 'UPDATE_FNAME',
	fname
});

export const updateLname = lname => ({
	type: 'UPDATE_LNAME',
	lname
});

export const updateGender = gender => ({
	type: 'UPDATE_GENDER',
	gender
});

export const updateTags = tags => ({
	type: 'UPDATE_TAGS',
	tags
});

export const updatePhotos = photos => ({
	type: 'UPDATE_PHOTOS',
	photos
});

export const updateOrientation = orientation => ({
	type: 'UPDATE_ORIENTATION',
	orientation
});

export const updateBirthdate = birthDate => ({
	type: 'UPDATE_BIRTHDATE',
	birthDate
});

export const updateLocation = location => ({
	type: 'UPDATE_LOCATION',
	location
});
