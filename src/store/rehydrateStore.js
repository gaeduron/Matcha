import { parse } from 'postgres-array';
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
		updateScore(user.score)
	]);
};


/*
 * 
 *
 *
 **/
