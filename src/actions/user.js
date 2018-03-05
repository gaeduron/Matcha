/* User actions */

export const updateId = id => ({
	type: 'UPDATE_ID',
	id
});

export const updateFname = fname => ({
	type: 'UPDATE_FNAME',
	fname
});

export const updateLname = lname => ({
	type: 'UPDATE_LNAME',
	lname
});

export const updateNickname = nickname => ({
	type: 'UPDATE_NICKNAME',
	nickname
});

export const updateGender = gender => ({
	type: 'UPDATE_GENDER',
	gender
});

export const updateTags = tags => ({
	type: 'UPDATE_TAGS',
	tags
});

//export const updatePhotos = photos => ({			
//		type: 'UPDATE_PHOTOS',
//		photos: JSON.parse(photos).map(photo => (photo === null ? undefined : photo))
//});

export const updatePhotos = photos => {

	console.log(photos, typeof(photos), 'action redux');
	return {		
		type: 'UPDATE_PHOTOS',
		photos
	};		
};

export const updateOrientation = orientation => ({
	type: 'UPDATE_ORIENTATION',
	orientation
});

export const updateBirthDate = birthDate => ({
	type: 'UPDATE_BIRTHDATE',
	birthDate
});

export const updateLocation = location => ({
	type: 'UPDATE_LOCATION',
	location
});

export const updateBio = bio => ({
	type: 'UPDATE_BIO',
	bio
});

export const updateOccupation = occupation => ({
	type: 'UPDATE_OCCUPATION',
	occupation
});

export const updateScore = score => ({
	type: 'UPDATE_SCORE',
	score
});
