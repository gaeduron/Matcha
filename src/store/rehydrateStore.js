import cookie from 'js-cookie';
import { sendInteraction } from '../actions/interactions'; 
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

	]);
	
	/* Interactions */
	dispatch(sendInteraction('SERVER/GET_VISITS', {}));
	dispatch(sendInteraction('SERVER/GET_MESSAGES', {}));
	dispatch(sendInteraction('SERVER/GET_LIKES', {}));
	dispatch(sendInteraction('SERVER/GET_BLOCKS', {}));

};


/*
 * 
 *
 *
 **/
