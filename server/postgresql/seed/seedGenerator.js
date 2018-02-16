require('dotenv').config({ path: '../../../.env.development' });
const faker = require('faker');
const randomLocation = require('random-location');
const gender = require('gender');
const fs = require('fs');
const axios = require('axios');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const shuffle = require('shuffle-array');
const database = require('../index');

const tags = [
	'cats', 'dogs', 'movies', 'music', 'books',
	'travel', 'sport', 'pokemon', 'sushi', 'fashion',
	'games', 'yoga', 'writing', 'trekking', 'startup',
	'humor', 'chill', 'kind', 'extrovert', 'introvert',
	'hookup', 'friendship', 'tall', 'short', 'workout'
];


function pickRand(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function pickPhoto(photos) {
	return photos.length 
		? photos.pop().secure_url  
		: 'http://fr.ga-homefinders.co.uk/images/testimonial_photos/testimonial_placeholder.jpg';	
}

function genUser({ occupations, okcupid, female, male }) {

	const orientation = ["bi", "gay", "hetero", "hetero", "hetero"];
	const P = { latitude: 48.861014, longitude: 2.341155 }; // Paris center
	const R = 1000 * 30; // 1km * xkm

	const { latitude, longitude } = randomLocation.randomCirclePoint(P, R);
	const identity = faker.helpers.contextualCard();
	const guessedGender = gender.guess(identity.name).gender == 'male' ? 'man' : 'woman';


	let user = {
		score: Math.floor(Math.random() * 1000),
		login: identity.username + Math.floor(Math.random() * 1000),
		password: "$2a$10$yb/ec0CAOI4syhgGnFxXe.1DwSC97/93neXjL8ZVuY6qXJJwfmrJ.",
		firstname: identity.name,
		lastname: faker.name.lastName(),
		email: identity.email,
		sex: guessedGender,
		sexualOrientation: pickRand(orientation),
		bio: okcupid[Math.floor(Math.random() * okcupid.length)],
		latitude,
		longitude,
		birthdate: faker.date.between('1977-01-01', '2000-01-01'),
		photos: `["${pickPhoto(guessedGender == 'man' ? male : female)}", null, null, null ,null]`, 
		geolocationAllowed: true,
		occupation:	occupations[Math.floor(Math.random() * occupations.length)],
		onboarding: false,
		tags: [pickRand(tags), pickRand(tags), pickRand(tags), pickRand(tags), pickRand(tags)]
				.reduce((x, y) => x.includes(y) ? x : [...x, y], [])
	};

	return user;
}

async function getCloudinaryPhotos(gender) {

	const url = `https://api.cloudinary.com/v1_1/matcha/resources/image/tags/${gender}?max_results=500`;

	try {
		const res = await axios.get(url, { 
			auth: {
				username: process.env.CLOUDINARY_API_KEY,
				password: process.env.CLOUDINARY_API_SECRET
			}
		});
		const photos = res.data.resources;
		return photos;
	} catch(e) {
		console.log(e);
	}
}

async function main() {

	try {
		/* Launch concurrent async requests */
		const okcupidPromise = readFile('okcupid', 'ascii');
		const occupationsPromise = readFile('occupations', 'ascii');
		const femalePromise = getCloudinaryPhotos('female');
		const malePromise = getCloudinaryPhotos('male');

		/* Catch all async returns */
		const [ okcupidJSON, occupationsJSON, female, male ] = await Promise.all([okcupidPromise, occupationsPromise, femalePromise, malePromise]);
		const customData = {
			okcupid: JSON.parse(okcupidJSON),
			occupations: JSON.parse(occupationsJSON),
			female: shuffle(female),
			male: shuffle(male)
		};
		
		let arr = [];
		while (arr.filter(user => user.sex == 'man').length < 251) {
			arr.push(genUser(customData));
		}

		let men = arr.filter(user => user.sex == 'man').slice(0,250);
		let women = arr.filter(user => user.sex == 'woman' && user.photos.includes('cloudinary')).slice(0,250);
		
		fs.writeFileSync('users.json', JSON.stringify([...men, ...women]) , 'ascii');

		//[...men, ...women].forEach(user => {
		//	console.log('------------------------');
		//	console.log(`name : ${user.firstname} ${user.lastname} ${user.sex}  |  ${user.login}`);
		//	console.log(user.tags);
		//});	

		console.log('users.json successfully created');
		process.exit(-1);

	
	} catch(e) {
		console.log('error: ', e);
	}
}


main();

/*	

	1. Definir les champs du JSON template
	2. Identifier les contraintes par champ
	a. Localisation : generer des latitudes range[X - Y] et longitude range[A - B] random
	perimetre ile de france 

	3. Generer 500 users avec faker
	4. scrapper 500 x 2 urls de photos
	a. 2 array - 1st profile x500 / 2nd autre x500
	5. Construire requete SQL pour enregistrer 1 user 
	6. Boucler sur les users json et lancer la requete SQL	

*/
