const format = require('pg-format');
const database = require('../../../../postgresql');
const myError = require('../../../../errors');
const logger = require('../../../../logs/logger');


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

const addTags = async (tags, userId) => {

	if (!tags)
		return error.emptyArray();
			
	if (tags.length == 0)
		return { message: ['Your tags have been successfully saved to the db !'] };

	const formattedTagsArray = tags.map(tag => [userId, tag]);
	console.log('user_id =', formattedTagsArray);

	const query = format(`INSERT INTO tags (user_id, tag) VALUES %L;`, formattedTagsArray);

	try {
		await database.query(query);
		logger.info('Tags succesfully inserted !');
		return { message: ['Your tags have been successfully saved to the db !'] };
	} catch (e) {
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
