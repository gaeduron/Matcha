import cookie from 'js-cookie';
import { sendInteraction } from '../actions/interactions'; 
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
	updateId,
} from '../actions/user';
import { updateAge } from '../actions/search';

const birthdateToAgeRange = (birthdate) => {
	if (birthdate === null) {
		birthdate = '1990-04-05 22:00:00+00';
	}
	let age = moment().diff(birthdate, 'years');
	const min = age - 5 < 18 ? 18 : age - 5;
	const max = age + 5 > 100 ? 100 : age + 5;
	return { min, max };
}

export default function rehydrateStore(dispatch, user) {


	console.log('hydrate raw', user.photos, typeof(user.photos));
	user.photos = JSON.parse(user.photos).map(photo => (photo === null ? undefined : photo));

	dispatch([

		/* User */
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
		updateId(user.id),
		updateAge(birthdateToAgeRange(user.birthdate)),
	]);
	
	/* Interactions */
	dispatch(sendInteraction('SERVER/GET_BLOCKS', {}));
	dispatch(sendInteraction('SERVER/GET_VISITS', {}));
	dispatch(sendInteraction('SERVER/GET_MESSAGES', {}));
	dispatch(sendInteraction('SERVER/GET_LIKES', {}));
	dispatch(sendInteraction('SERVER/GET_MATCHES', {}));

};


/*
 * 
 *
 *
 **/
