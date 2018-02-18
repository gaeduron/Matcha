const format = require('pg-format');
const database = require('../../../../postgresql');
const myError = require('../../../../errors');
const logger = require('../../../../logs/logger');
const getTags = require('./getTags');


const error = {
	database: myError.newFailure({
		log: e => `Database error during tags insertion =>\n${e}`,
		message: 'Error, please try again later',
	}),
	emptyArray: myError.newFailure({
		log: 'Error, the tag array is empty ',
		message: 'Error, you sent an empty array',
	}),
};


function resolveTagsConfict(tags, newTags) {
	 return newTags.filter(tag => !tags.includes(tag));
}


const addTags = async (tags = [], userId) => {

	/*  resolveTagsConfict 		
     *  
     *  oldTags 	[ 1, 2, 3 ]
     *  newTags	          [ 3, 4, 5 ]
     *            	| rm  | 0 |  add |
	 */

	const oldTags = await getTags(userId);
	const tagsToAdd = resolveTagsConfict(oldTags, tags);
	const tagsToRemove = resolveTagsConfict(tags, oldTags);

	try {
	
		if (tagsToRemove.length > 0) {
			const query = 'DELETE FROM tags WHERE user_id = $1 AND tag = $2';	
			for (let tag of tagsToRemove) {
				await database.query(query, [userId, tag]);
			}
			logger.info(`[${tagsToRemove}] - Tags succesfully removed !`);
		}

		if (tagsToAdd.length > 0) {
			const query = format(`INSERT INTO tags (user_id, tag) VALUES %L;`, tagsToAdd.map(tag => [userId, tag]));
			await database.query(query);
			logger.info(`[${tagsToAdd}] - Tags succesfully inserted !`);
		}

		return { message: ['Your tags have been successfully saved to the db !'] };

	} catch(e) {
		logger.error(`Tags update failed - ${e}`); 
		return error.database();	
	}		

};

module.exports = addTags;


/*
 *	The goal of pg-format in this context is to insert a variable number of rows (individual tags) 
 *	in the DB, in a single sanitized query, instead of executing a query for each tag. 
 *	No ORM were allowed for this project. 	
 *
 *	(Read more at: https://github.com/brianc/node-postgres/issues/957)
 *
 *	formattedTagsArray = [[id, tag], [], [], ...]
 *
 *  Example
 *  -------
 *
 *	var values = [
 *	    [ 1, 'jack' ],
 *      [ 2, 'john' ],
 *	    [ 3, 'jill' ],
 *  ];
 *	
 *	console.log(format('INSERT INTO test_table (id, name) VALUES %L', values));
 *  --> INSERT INTO test_table (id, name) VALUES ('1', 'jack'), ('2', 'john'), ('3', 'jill')
 *
 *	---------------
 *	[ ] could add a check for duplicated tags for users that bypass front end validation
 *		either by a de-duplication query || INSERT IF NOT EXIST 
 *
 **/

//async function updateTags(user, id) {
//
//	const tags = await getTags(id);	
//
//	const newTags = resolveTagsConfict(tags, user.tags);		
//
//	if (newTags.length == 0)
//		return ;
//
//
//	const formattedTagsArray = newTags.map(tag => [id, tag]);
//	const query = format(`INSERT INTO tags (user_id, tag) VALUES %L;`, formattedTagsArray);
//	console.log('user_id =', formattedTagsArray);
//	console.log('formatted query', query);
//
//	try {
//		await database.query(query);
//		return { message: ['Your tags have been successfully saved to the db !'] };
//	} catch (e) {
//		console.log(e);
//	}
//
//}


//async function getId(user) {
//
//	console.log(user.login);		
//	const query = `SELECT id FROM users WHERE login = $1;`;		
//
//	try {
//		const res = await database.query(query, [user.login]);
//		return res.rows[0].id;
//	} catch (e) {
//		return console.log(e);
//	}
//}
