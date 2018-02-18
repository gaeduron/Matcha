require('dotenv').config({ path: '../../../.env.development' });
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const database = require('../index');
const format = require('pg-format');

process.on('unhandledRejection', r => console.log(r));


async function addTags({ tags }, id) {

	const formattedTagsArray = tags.map(tag => [id, tag]);
	const query = format(`INSERT INTO tags (user_id, tag) VALUES %L;`, formattedTagsArray);

	try {
		await database.query(query);
		return { message: ['Your tags have been successfully saved to the db !'] };
	} catch (e) {
		console.log(e);
	}

}

async function fillDB(user) {

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
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
			RETURNING id;
	`;
	
	try {
		const res = await database.query(query, Object.values(user).splice(0,16));
		return res;
	} catch (e) {
		return console.log(e);
	}
}

async function  main() {

	try {
		const users = JSON.parse(await readFile('users.json', 'ascii'));

		for (let user of users) {
			const id = (await fillDB(user)).rows[0].id;
			addTags(user, id);
		}

	console.log(`Database seeded with ${users.length} new users`);		
	process.exit(1);	
	

	} catch(e) {
		console.log(e);
	} 	

}

main();

