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
	updateLocation	
} from '../actions/user';

export default function rehydrateStore(dispatch, user) {

	dispatch([
		updateFname(user.firstname),	
		updateLname(user.lastname),	
		updateNickname(user.login),	
		updateBirthDate(user.birthdate),
		updateGender(user.sex),	
		updateOrientation(user.sexualOrientation),	
		updatePhotos(parse(user.photos)),	
		updateBio(user.bio),	
		updateOccupation(user.occupation),	
		updateLocation({ 
			latitude: user.latitude, 
			longitude: user.longitude, 
			geolocationAllowed: user.geolocationAllowed 
		})	

		//	updateTags(tags),	
		
	]);
};


/*
 * 
 *
 *
 **/
