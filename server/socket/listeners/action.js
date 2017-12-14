/* Default socket listner for Redux-Socket.io middleware */

const logger = require('../../logs/logger');
const getProfile = require('../../actions/onboarding/getProfile');

const actionListeners = (socket) => {
	socket.on('action', async (action) => {
		switch (action.type) {

			case 'SERVER/SAVE_PROFILE':
				console.log('SERVER/SAVE_PROFILE received', action.data);
				const response = await getProfile(action.data);
				if (response.error) {
					socket.emit('notify_error', response);
				} else {
					socket.emit('getProfile', action.data);
					logger.succes('Onboarding: user profile data saved to DB');
				}

			default: 
				return;
		}
	});
};

module.exports = actionListeners;
