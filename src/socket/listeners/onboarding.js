import moment from 'moment';
import { step, completeOnboarding } from '../../actions/onboarding'; 
import { Redirect } from 'react-router-dom';

import {
	updateFname,	
	updateLname,	
	updateNickname,	
	updateGender,	
	updateOrientation,	
	updatePhotos,	
	updateTags,	
	updateBirthDate,	
	updateOccupation,	
	updateBio,	
	updateLocation	
} from '../../actions/user';
import { updateAge } from '../../actions/search';

const birthdateToAgeRange = (birthdate) => {
    if (birthdate === null) {
        birthdate = '1990-04-05 22:00:00+00';
    }
    let age = moment().diff(birthdate, 'years');
    const min = age - 5 < 18 ? 18 : age - 5;
    const max = age + 5 > 100 ? 100 : age + 5;
    return { min, max };
}

const onboardingListener = (dispatch, socket) => {
	socket.on('SERVER/SAVE_PROFILE', (res) => {
		dispatch([
			updateFname(res.fname),	
			updateLname(res.lname),	
			updateNickname(res.nickname),	
			updateBirthDate(res.birthDate),
			updateAge(birthdateToAgeRange(res.birthDate)),
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

	socket.on('SERVER/SAVE_TAGS', ({ tags }) => {
		dispatch([
			updateTags(tags),	
			step()
		]);
	});

	socket.on('SERVER/SAVE_PHOTOS', ({ photosUrl }) => {
		
		photosUrl = JSON.parse(photosUrl).map(photo => (photo === null ? undefined : photo));

		dispatch([
			updatePhotos(photosUrl),	
			step()
		]);
	});

	socket.on('SERVER/SAVE_BIO', ({ bio, occupation }) => {
		dispatch([
			updateBio(bio),	
			updateOccupation(occupation),	
			step()
		]);
	});

	socket.on('SERVER/SAVE_LOCATION', ({ latitude, longitude, geolocationAllowed = false }) => {
		dispatch([
			updateLocation({ latitude, longitude, geolocationAllowed }),	
			completeOnboarding()
		]);
	});

	socket.on('SERVER/EDIT_PROFILE', (data) => {
		
		data.photosUrl = JSON.parse(data.photosUrl).map(photo => (photo === null ? undefined : photo));

		const {
			latitude, 
			longitude, 
			geolocationAllowed,
			bio, 
			occupation,
			photosUrl,
			tags,
			orientation,
			gender,
			fname,
			lname,
			nickname,
			birthDate
		} = data; 


		dispatch([
			updateFname(fname),	
			updateLname(lname),	
			updateNickname(nickname),	
			updateBirthDate(birthDate),
			updateGender(gender),	
			updateOrientation(orientation),	
			updatePhotos(photosUrl),	
			updateBio(bio),	
			updateOccupation(occupation),	
			updateLocation({ latitude, longitude, geolocationAllowed }),	
			updateTags(tags)	
		]);
	});

};

export default onboardingListener;
