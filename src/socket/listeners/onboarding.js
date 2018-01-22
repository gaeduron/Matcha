import { step } from '../../actions/onboarding'; 

import {
	updateFname,	
	updateLname,	
	updateNickname,	
	updateGender,	
	updateOrientation,	
	updatePhotos,	
	updateTags,	
	updateBirthDate,	
	updateLocation	
} from '../../actions/user';

const onboardingListener = (dispatch, socket) => {
	socket.on('SERVER/SAVE_PROFILE', (res) => {
		dispatch([
			updateFname(res.fname),	
			updateLname(res.lname),	
			updateNickname(res.nickname),	
			updateBirthDate(res.birthDate),
			step()
		]);
	});

	socket.on('SERVER/SAVE_GENDER', ({ gender, orientation }) => {
		dispatch([
			updateGender(gender),	
			updateOrientation(orientation),	
			step()
		]);
	});

	socket.on('SERVER/SAVE_LOCATION', ({ latitude, longitude }) => {
		dispatch([
			updateLocation({ latitude, longitude }),	
			step()
		]);
	});

	socket.on('SERVER/SAVE_TAGS', ({ tags }) => {
		dispatch([
			updateTags(tags),	
			step()
		]);
	});

	socket.on('SERVER/SAVE_PHOTOS', ({ photosUrl }) => {
		dispatch([
			updatePhotos(photosUrl),	
			step()
		]);
	});
};

export default onboardingListener;
