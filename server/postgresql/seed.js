require('dotenv').config({ path: '../../.env.development' });
const faker = require('faker');
const randomLocation = require('random-location');
const gender = require('gender');
const fs = require('fs');
const axios = require('axios');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const shuffle = require('shuffle-array');
const database = require('./index');
const format = require('pg-format');

const tags = [
	'cats', 'dogs', 'movies', 'music', 'books',
	'travel', 'sport', 'pokemon', 'sushi', 'fashion',
	'games', 'yoga', 'writing', 'trekking', 'startup',
	'humor', 'chill', 'kind', 'extrovert', 'introvert',
	'hookup', 'friendship', 'tall', 'short', 'workout'
];


async function getId(user) {

	console.log(user.login);		
	const query = `SELECT id FROM users WHERE login = $1;`;		

	try {
		const res = await database.query(query, [user.login]);
		return res.rows[0].id;
	} catch (e) {
		return console.log(e);
	}
}


async function getTags(userId) {

	const query = `SELECT tag FROM tags WHERE user_id = $1;`;		

	try {
		const res = await database.query(query, [userId]);
		return res.rows.map(row => row.tag);
	} catch (e) {
		return console.log(e);
	}
}

function resolveTagsConfict(tags, newTags) {
	 return newTags.filter(tag => !tags.includes(tag));
}

async function addTags(user, id) {

	const tags = await getTags(id);	

	const newTags = resolveTagsConfict(tags, user.tags);		

	if (newTags.length == 0)
		return ;


	const formattedTagsArray = newTags.map(tag => [id, tag]);
	const query = format(`INSERT INTO tags (user_id, tag) VALUES %L;`, formattedTagsArray);
	console.log('user_id =', formattedTagsArray);
	console.log('formatted query', query);

	try {
		await database.query(query);
		return { message: ['Your tags have been successfully saved to the db !'] };
	} catch (e) {
		console.log(e);
	}

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
		photos: `["${pickPhoto(guessedGender == 'man' ? male : female)}", null, null, null ,null]`, // TO DO 
		geolocationAllowed: true,
		occupation:	occupations[Math.floor(Math.random() * occupations.length)],
		onboarding: false,
		tags: [pickRand(tags), pickRand(tags), pickRand(tags), pickRand(tags), pickRand(tags)]
	};

	return user;
}


async function fillDB(user) {

//	console.log('obj values: ', Object.values(user));
	const query = `
		INSERT INTO users (
				score,
				login,
				password,
				firstname,
				lastname,
				email,
				sex,
				sexual_orientation,
				bio,
				latitude,
				longitude,
				birthdate,
				photos,
				geolocation_allowed,
				occupation,
				onboarding
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
	`;
	
	try {
		const res = await database.query(query, Object.values(user).splice(0,16));
		return res;
	} catch (e) {
		return console.log(e);
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

		
		fs.writeFile('final3.json', JSON.stringify([...men, ...women]) , 'ascii', err => console.log(err));


		//console.log(women[249]);
	//	console.log(men[249]);

	//	const id = await getId({ login: 'Arnaldo.Satterfield298' });
		
	//addTags({ tags: ['a', 'b', 'd', 'e', 'f'] }, 415);

	//const tags = await getTags(415);
	//console.log('tags :', tags);

	//	for (let i = 0; i < 100; i++) {
	//		fillDB(women[i]);
	//	}


		console.log('ok');
	
	} catch(e) {
		console.log('error: ', e);
	}

//	process.exit(0);
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
