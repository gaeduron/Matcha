// STEPS //
const updateConnection = require('./steps/updateConnection');
const updateLastConnection = require('./steps/updateLastConnection');
const updatePassword = require('./steps/updatePassword');
const updateSessionToken = require('./steps/updateSessionToken');
const updatePasswordResetToken = require('./steps/updatePasswordResetToken');
const updatePasswordResetExpireAt = require('./steps/updatePasswordResetExpireAt');
const updateReport = require('./steps/updateReport');
const validateEmail = require('./steps/validateEmail');
const validateFirstname = require('./steps/validateFirstname');
const validateLastname = require('./steps/validateLastname');
const validateLogin = require('./steps/validateLogin');
const validatePassword = require('./steps/validatePassword');
const validateBirthdate = require('./steps/validateBirthdate');
const validateGender = require('./steps/validateGender');
const validateLocation = require('./steps/validateLocation');
const validateOrientation = require('./steps/validateOrientation');
const validateTags = require('./steps/validateTags');
const validatePhotos = require('./steps/validatePhotos');
const validateOccupation = require('./steps/validateOccupation');
const validateBio = require('./steps/validateBio');
const hashPassword = require('./steps/hashPassword');
const create = require('./steps/create');
const createBlock = require('./steps/createBlock');
const deleteBlock = require('./steps/deleteBlock');
const facebookCreate = require('./steps/facebookCreate');
const addTags = require('./steps/tags/addTags');
const getTags = require('./steps/tags/getTags');
const likeMe = require('./steps/likeMe');
const addLike = require('./steps/likes/addLike');
const addUnlike = require('./steps/likes/addUnlike');
const getLikes = require('./steps/likes/getLikes');
const getMatches = require('./steps/likes/getMatches');
const addVisit = require('./steps/visits/addVisit');
const getVisits = require('./steps/visits/getVisits');
const addMessage = require('./steps/messages/addMessage');
const getMessages = require('./steps/messages/getMessages');
const getOnlineUsers = require('./steps/online/getOnlineUsers');
const seen = require('./steps/interactions/seen');
const clicked = require('./steps/interactions/clicked');
const block = require('./steps/interactions/block');
const getBlocks = require('./steps/interactions/getBlocks');
const getDistanceBetween = require('./steps/getDistanceBetween');
const isBlocked = require('./steps/isBlocked');

// PATHS //
const find = require('./paths/find');
const newSession = require('./paths/newSession');
const update = require('./paths/update');
const getProfiles = require('./paths/getProfiles');
const getProfilesCount = require('./paths/getProfilesCount');

module.exports = {
	// STEPS //
	updateConnection,
	updateLastConnection,
	updatePassword,
	updateSessionToken,
	updatePasswordResetToken,
	updatePasswordResetExpireAt,
	updateReport,
	validateEmail,
	validateFirstname,
	validateLastname,
	validateLogin,
	validatePassword,
	validateBirthdate,
	validateGender,
	validateOrientation,
	validateLocation,
	validateTags,
	validatePhotos,
	validateBio,
	validateOccupation,
	hashPassword,
	create,
	createBlock,
	deleteBlock,
	facebookCreate,
	addTags,
	getTags,
	likeMe,
	addLike,
	addUnlike,
	getLikes,
	getMatches,
	addVisit,
	getVisits,
	addMessage,
	getMessages,
	getOnlineUsers,
	seen,
	clicked,
	block,
	getBlocks,
	getDistanceBetween,
	isBlocked,

	// PATHS //
	find,
	newSession,
	update,
	getProfiles,
	getProfilesCount,
};
