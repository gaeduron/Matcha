const logger = require('../../logs/logger');
const getProfile = require('../../actions/onboarding/getProfile');

const onboardingListeners = (socket) => {

	socket.on('getProfile', async (profile) => {
		logger.info('Onboarding - receiving user profile data...');
		logger.info(`\n ${JSON.stringify(profile, null, 2)}`);
		const response = await getProfile(profile);
		//console.log('server - getprofile emiting back');
		if (response.error) {
			socket.emit('notify_error', response);
		} else {
		 	socket.emit('getProfile', profile);
		 	socket.emit('notificationError', 'Bravo');
		 	logger.succes('Onboarding: user profile data saved to DB');
		}
	});

};

module.exports = onboardingListeners;
