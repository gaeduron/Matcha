import { parse } from 'postgres-array';
import moment from 'moment';
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
	updateLocation,
	updateScore,
} from '../actions/user';
import { updateAge } from '../actions/search';

const birthdateToAgeRange = (birthdate) => {
	let age = moment().diff(birthdate, 'years');
	const min = age - 5 < 18 ? 18 : age - 5;
	const max = age + 5 > 100 ? 100 : age + 5;
	return { min, max };
}

export default function rehydrateStore(dispatch, user) {


	console.log('hydrate raw', user.photos, typeof(user.photos));
	user.photos = JSON.parse(user.photos).map(photo => (photo === null ? undefined : photo));

	dispatch([
		updateFname(user.firstname),	
		updateLname(user.lastname),	
		updateNickname(user.login),	
		updateBirthDate(user.birthdate),
		updateGender(user.sex),	
		updateOrientation(user.sexualOrientation),	
		updatePhotos(user.photos),	
		updateBio(user.bio),	
		updateOccupation(user.occupation),	
		updateLocation({ 
			latitude: user.latitude, 
			longitude: user.longitude, 
			geolocationAllowed: user.geolocationAllowed 
		}),
		updateTags(user.tags),
		updateScore(user.score),
		updateAge(birthdateToAgeRange(user.birthdate)),
	]);
};


/*
 * 
 *
 *
 **/
