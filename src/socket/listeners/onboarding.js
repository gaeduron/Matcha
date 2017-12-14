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
	socket.on('getProfile', (res) => {
		console.log('getProfile response: ', res);
		dispatch([
			updateFname(res.fname),	
			updateLname(res.lname),	
			updateNickname(res.nickname),	
			updateBirthDate(res.birthDate)
		]);
	});
};

export default onboardingListener;
