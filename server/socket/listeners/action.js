/* Default socket listner for Redux-Socket.io middleware */

const logger = require('../../logs/logger');
const getProfile = require('../../actions/onboarding/getProfile');
const getGender = require('../../actions/onboarding/getGender');


const startAction = async (action, socket, actionFunc, loggerContent) => {
	const response = await actionFunc(action.data);
	if (response.error) {
		socket.emit('notify_error', response);
	} else {
		socket.emit(action.type, action.data);
		logger.succes(loggerContent);
	}
};

const actionListeners = (socket) => {
	socket.on('action', (action) => {

		switch (action.type) {
			case 'SERVER/SAVE_PROFILE':
				startAction(action, socket, getProfile, 'Onboarding: user profile data saved to DB');
				break; 
			case 'SERVER/SAVE_GENDER':
				startAction(action, socket, getGender, 'Onboarding: user gender data saved to DB');

			default: 
				return;
		}
	});
};

module.exports = actionListeners;
