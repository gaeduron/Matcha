const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'visit - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const getWantedGender = (orientation, gender) => {
    if (orientation == 'straight') {
        return gender == 'woman' ? 639 : 951;
    } else if (orientation == 'gay') {
        return gender == 'man' ? 639 : 951;
    } else {
        return 951;
    }
}


const selectBot = async (user) => {
	const botID = getWantedGender(user.sexualOrientation, user.sex);
	const bot = await Users.find({ id: botID });

	return (bot);
};

module.exports = selectBot;
