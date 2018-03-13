const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using ID',
		message: 'An error occured please try again later',
	}),
};

const getProfileByID = async (data) => {
	logger.info(`Reporting user: ${data.profileID}`);	
	const res = await Users.updateReport({id: data.profileID, report: true});
	if (res.error) { return res.error }

	return  { data:
				{
					profile: null,
				}
			};
};

module.exports = getProfileByID;
