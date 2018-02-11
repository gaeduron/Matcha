const { pick } = require('ramda');
const getProfile = require('../onboarding/getProfile');
const getGender = require('../onboarding/getGender');
const getLocation = require('../onboarding/getLocation');
const getTags = require('../onboarding/getTags');
const getPhotos = require('../onboarding/getPhotos');
const getBio = require('../onboarding/getBio');

const editProfile = async (data) => {
	
	data = {
		...data.profile,
		...data.location,
		tags: data.tags,
		photosUrl: data.photos,
		sessionToken: data.sessionToken
	};
	console.log('Somebody Toucha My Data ! ', data);

	let responses = [];
	responses.push(await getProfile(pick(['fname', 'lname', 'nickname', 'birthDate', 'sessionToken'], data)));
	responses.push(await getGender(pick(['gender', 'orientation', 'sessionToken'], data)));
	responses.push(await getBio(pick(['bio', 'occupation', 'sessionToken'], data)));
	responses.push(await getLocation(pick(['latitude', 'longitude', 'geolocationAllowed', 'sessionToken'], data)));
	responses.push(await getTags(pick(['tags', 'sessionToken'], data)));
//	responses.push(await getPhotos(pick(['photos', 'sessionToken'], data)));

// resoudre erreur getPhoto
// comprendre pourquoi getLocation validation is invalid 
// connecter redux pour la reponse 

	
	

	const response = responses.filter(response => response.error)[0];

	console.log('Somebody Toucha My Response ! ', response);
	console.log('slected response ', response.error ? response : data);
	return response.error ? response : data; 
};

module.exports = editProfile;


/*
 1. Consolider l'objet de reponse
 2. Passer les pick a chaque action 
 3. Boucler sur les reponses, if error, return error, else return response object

 
 */
