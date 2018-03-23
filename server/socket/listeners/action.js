/* Default socket listner for Redux-Socket.io middleware */
const Users = require('../../models/user');

const logger = require('../../logs/logger');
const getProfile = require('../../actions/onboarding/getProfile');
const getGender = require('../../actions/onboarding/getGender');
const getLocation = require('../../actions/onboarding/getLocation');
const getTags = require('../../actions/onboarding/getTags');
const getPhotos = require('../../actions/onboarding/getPhotos');
const getBio = require('../../actions/onboarding/getBio');
const getProfiles = require('../../actions/search/getProfiles');
const getProfilesCount = require('../../actions/search/getProfilesCount');
const getProfileByID = require('../../actions/search/getProfileByID');
const reportProfile = require('../../actions/search/reportProfile');
const blockProfile = require('../../actions/search/blockProfile');
const unblockProfile = require('../../actions/search/unblockProfile');
const editProfile = require('../../actions/edit/editProfile');
const addUnlike = require('../../actions/interactions/addUnlike');
const addLike = require('../../actions/interactions/addLike');
const getLikes = require('../../actions/interactions/getLikes');
const getMatches = require('../../actions/interactions/getMatches');
const addVisit = require('../../actions/interactions/addVisit');
const getVisits = require('../../actions/interactions/getVisits');
const addMessage = require('../../actions/interactions/addMessage');
const getMessages = require('../../actions/interactions/getMessages');
const seen = require('../../actions/interactions/seen');
const clicked = require('../../actions/interactions/clicked');
const block = require('../../actions/interactions/block');
const getBlocks = require('../../actions/interactions/getBlocks');
const botGreetings = require('../../actions/bots/botGreetings');
const botLike = require('../../actions/bots/botLike');
const botMessage = require('../../actions/bots/botMessage');

const emitTimed = async ({ event, data, socket, action, actionData }) => {	
	if (action) {
		const res = await action(actionData);
		if (res.error) {
			socket.emit('notificationError', response.error[0]);
		} else if (res.notBot) {
			return 0;	
		} else {
			socket.emit(event, res.data);
			if (event != 'SERVER/GET_MESSAGES') {
				socket.emit('SERVER/GET_INTERACTIONS', {});
			}
		}
	} else {
		socket.emit(event, data)
	}
}

const startAction = async (action, socket, actionFunc, loggerContent) => {

	/* Verify that the user is authenticated */
	const auth = await Users.find({ socketID: socket.id });
	if (auth.error) {
		socket.emit('notificationError', "You must be authenticated");
		return ;	
	}	

	//* Launch action */
	action.data.socketID = socket.id;
	action.data.id = auth.user.id;
	action.data.user = auth.user;
	const response = await actionFunc(action.data);


	if (response.error) {
		if (response.type == 'info') {
		socket.emit('notificationInfo', response.error[0]);
		} else {
		socket.emit('notificationError', response.error[0]);
		}
	} else {

		/* Only if a response need to be broadcasted to one or many users ws */
		if (response.sockets) {
			response.sockets.forEach(ws => {
				socket.to(ws).emit(action.type, {});						
				console.log(`emitting to ${ws}...`);	
			});
		}	

		/* Send back either the initial data to client or the response output */	
		if (!!response.data) {
			logger.succes(`EMIT: ${action.type}`);
			socket.emit(action.type, response.data);
		} else {
			socket.emit(action.type, action.data);
		}

		/* Only if a notification message need to be sent */
		switch (action.type) {
			case 'SERVER/REPORT_PROFILE': 
				socket.emit('notificationInfo', 'User has been reported.');
				break;
			case 'SERVER/BLOCK_PROFILE': 
				socket.emit('notificationInfo', 'User has been blocked.');
				break;
			case 'SERVER/UNBLOCK_PROFILE': 
				socket.emit('notificationInfo', 'User has been unblocked.');
				break;
			case 'SERVER/SAVE_LOCATION': 
				socket.emit('notificationSuccess', 'Congratulations, welcome to Matcha !');
				setTimeout(emitTimed, 20000, {
					socket,
					data: response.notificationData,
					event: 'notificationVisit',
					action: botGreetings,
					actionData: action.data.user,
				});
				setTimeout(emitTimed, 23000, {
					socket,
					data: response.notificationData,
					event: 'notificationLike',
					action: botLike,
					actionData: action.data.user,
				});
				break;
			case 'SERVER/EDIT_PROFILE': 
				socket.emit('notificationSuccess', 'Profile updated');
				break;
			case 'SERVER/GET_PROFILES': 
				socket.emit('SERVER/UPDATE_FILTERS', action.data);
				break;
			case 'SERVER/ADD_VISIT': 
				socket.to(response.sockets[0]).emit('notificationVisit', response.notificationData);
				break;
			case 'SERVER/ADD_LIKE': 
				if (response.matchNotification) {
					console.log('Notifying match \n\n\n\n', response);
					socket.emit('notificationMatch', response.notificationDataUser);
					socket.to(response.sockets[0]).emit('notificationMatch', response.notificationData);
					setTimeout(emitTimed, 5000, {
						socket,
						data: response.notificationData,
						event: 'notificationChat',
						action: botMessage,
						actionData: {
							sender: response.notificationData,
							receiver: response.notificationDataUser,
						},
					});
					setTimeout(emitTimed, 6000, {
						socket,
						data: response.notificationData,
						event: 'SERVER/GET_MESSAGES',
						action: getMessages,
						actionData: {
							id: response.notificationData.login
						},
					});
				} else
					socket.to(response.sockets[0]).emit('notificationLike', response.notificationData);
				break;
			case 'SERVER/ADD_UNLIKE': 
				socket.to(response.sockets[0]).emit('notificationUnlike', response.notificationData);
				break;
			case 'SERVER/ADD_MESSAGE': 
				response.notificationData.message = response.message;
				socket.to(response.sockets[0]).emit('notificationChat', response.notificationData);
				setTimeout(emitTimed, 2000, {
					socket,
					data: response.notificationData,
					event: 'notificationChat',
					action: botMessage,
					actionData: {
						sender: { login: action.data.id },
						receiver: { login: action.data.receiver.user.id },
					},
				});
				setTimeout(emitTimed, 3000, {
					socket,
					data: response.notificationData,
					event: 'SERVER/GET_MESSAGES',
					action: getMessages,
					actionData: {
						id: action.data.id
					},
				});
				break;
		}

		logger.succes(loggerContent);
		delete response.sockets;
	}
};


const actionListeners = (socket) => {
	socket.on('action', (action) => {

		switch (action.type) {
			
			/* Onboarding  */
			case 'SERVER/SAVE_PROFILE': /* lname, fname, nickname, birthdate */
				startAction(action, socket, getProfile, 'Onboarding: user profile data saved to DB');
				break; 
			case 'SERVER/SAVE_GENDER':
				startAction(action, socket, getGender, 'Onboarding: user gender data saved to DB');
				break; 
			case 'SERVER/SAVE_LOCATION': /* latitude, longitude, geolocationAllowed */
				startAction(action, socket, getLocation, 'Onboarding: user location data saved to DB');
				break; 
			case 'SERVER/SAVE_TAGS':
				startAction(action, socket, getTags, 'Onboarding: user tags saved to DB');
				break; 
			case 'SERVER/SAVE_PHOTOS':
				startAction(action, socket, getPhotos, 'Onboarding: user photos saved to DB');
				break; 
			case 'SERVER/SAVE_BIO': /* bio, occupation */ 
				startAction(action, socket, getBio, 'Onboarding: user bio and occupation saved to DB');
				break; 
			case 'SERVER/EDIT_PROFILE': 
				startAction(action, socket, editProfile, 'Onboarding: user bio and occupation saved to DB');
				break; 

			/* Search */
			case 'SERVER/GET_PROFILE_BY_ID':
				startAction(action, socket, getProfileByID, 'Search: profile data fetched');
				break;
			case 'SERVER/REPORT_PROFILE':
				startAction(action, socket, reportProfile, 'Search: report profile');
				break;
			case 'SERVER/BLOCK_PROFILE':
				startAction(action, socket, blockProfile, 'Search: block profile');
				break;
			case 'SERVER/UNBLOCK_PROFILE':
				startAction(action, socket, unblockProfile, 'Search: unblock profile');
				break;
			case 'SERVER/GET_PROFILES':
				startAction(action, socket, getProfiles, 'Search: user profiles data fetched');
				break;
			case 'SERVER/GET_PROFILES_COUNT':
				startAction(action, socket, getProfilesCount, 'Search: user profiles count fetched');
				break;
 

			/* Interactions (likes & visits) */	
			case 'SERVER/ADD_UNLIKE':
				startAction(action, socket, addUnlike, 'Updating unlike to db');
				break;
			case 'SERVER/ADD_LIKE':
				startAction(action, socket, addLike, 'Adding new like to db');
				break;
			case 'SERVER/GET_LIKES':
				startAction(action, socket, getLikes, 'Retrieving all user\'s likes from db');
				break;
			case 'SERVER/GET_MATCHES':
				startAction(action, socket, getMatches, 'Retrieving all user\'s matches from db');
				break;
			case 'SERVER/ADD_VISIT':
				console.log('visit : ', action);
				startAction(action, socket, addVisit, 'New visit saved to DB');
				break;
			case 'SERVER/GET_VISITS':
					startAction(action, socket, getVisits, 'Retrieving all user\'s visits from db');
				break;
			case 'SERVER/ADD_MESSAGE':
				startAction(action, socket, addMessage, 'New message saved to DB');
				break;
			case 'SERVER/GET_MESSAGES':
					startAction(action, socket, getMessages, 'Retrieving all user\'s messages from db');
				break;
			case 'SERVER/SEEN':
					startAction(action, socket, seen, 'Updating user notifications status to SEEN');
				break;
			case 'SERVER/CLICKED':
					startAction(action, socket, clicked, 'Updating user notifications status to CLICKED');
				break;
			case 'SERVER/BLOCK':
				startAction(action, socket, block, 'Blocking / Unblocking user');
				break;
			case 'SERVER/GET_BLOCKS':
				startAction(action, socket, getBlocks, 'Blocked users retrieved');
				break;

				
			default: 
				return;
		}
	});
};

module.exports = actionListeners;
