var faker = require('faker');
var randomLocation = require('random-location');
var gender = require('gender');


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

function pickRand(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function genUser() {

	const orientation = ["bi", "gay", "hetero", "hetero", "hetero"];
	const P = { latitude: 48.861014, longitude: 2.341155 }; // Paris center
	const R = 1000 * 30; // 1km * xkm

	const { latitude, longitude } = randomLocation.randomCirclePoint(P, R);
	const identity = faker.helpers.contextualCard();
	const guessedGender = gender.guess(identity.name).gender == 'male' ? 'man' : 'woman';


	let user = {
		score: Math.floor(Math.random() * 1000),
		login: identity.username,
		password: "$2a$10$yb/ec0CAOI4syhgGnFxXe.1DwSC97/93neXjL8ZVuY6qXJJwfmrJ.",
		firstname: identity.name,
		lastname: faker.name.lastName(),
		email: identity.email,
		sex: guessedGender,
		sexualOrientation: pickRand(orientation),
		bio: faker.hacker.phrase(),
		latitude,
		longitude,
		birthdate: faker.date.between('1985-01-01', '2000-01-01'),
		photos: '[null, null, null, null ,null]', // TO DO 
		geolocationAllowed: true,
		occupation:	faker.name.jobTitle(),
		onboarding: false
	};

	return user;
}

for (let i = 0; i < 3; i++)
	console.log(`user ${i}: \n`,genUser());



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



   {
	   id: 62, 
	   		// N/A Auto increment by pgsql
	   connected: null, 
	   		// null
	   score: 0, 
	   		// rand [0 - 1000]
	   reported: null, 
	   		// null
	   login: "narajaon",
	   		// faker 
	   password: "$2a$10$yb/ec0CAOI4syhgGnFxXe.1DwSC97/93neXjL8ZVuY6qXJJwfmrJ.", 
	   		// Same for evryone 'Azerty123'
	   firstname: "Fabien",
	   		// faker 
	   lastname: "Narajaon",
	   		// faker 
	   email: "narajaon@student.42.fr",
	   		// faker 
	   sex: "man",
	   		// pickRand 
	   sexualOrientation: "straight",
	   		// pickRand
	   bio: "Currently developing a patented way to produce noodle soups while POEing",
	   		// faker 
	   longitude: null,
	   		// RandomLocation 
	   latitude: null,
	   		// RandomLocation 
	   lastConnection: null,
	   		// null 
	   sessionToken: "e81a497b-9377-46e0-ba28-2465cfcf468e",
	   		// null
	   passwordResetToken: null,
	   		// null
	   passwordResetExpireAt: null,
	   		// null
	   birthdate: "1993-06-11T22:00:00.000Z",
	   		// faker (format?)
	   photos: "[\"https://res.cloudinary.com/matcha/image/upload/v1518520962/i6isiebcxslp3mclglbs.png\",null,null,null,null]",
	   geolocationAllowed: false,
	   		// true
	   occupation: "Dev Swift",
	   		// faker
	   onboarding: true
		   // false
   }

 */
