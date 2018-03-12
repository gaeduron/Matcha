// STEPS //
const updateConnection = require('./steps/updateConnection');
const updateLastConnection = require('./steps/updateLastConnection');
const updatePassword = require('./steps/updatePassword');
const updateSessionToken = require('./steps/updateSessionToken');
const updatePasswordResetToken = require('./steps/updatePasswordResetToken');
const updatePasswordResetExpireAt = require('./steps/updatePasswordResetExpireAt');
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
const facebookCreate = require('./steps/facebookCreate');
const addTags = require('./steps/tags/addTags');
const getTags = require('./steps/tags/getTags');
const likeMe = require('./steps/likeMe');
const addLike = require('./steps/likes/addLike');
const getLikes = require('./steps/likes/getLikes');
const addVisit = require('./steps/visits/addVisit');
const getVisits = require('./steps/visits/getVisits');
const getOnlineUsers = require('./steps/online/getOnlineUsers');

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
	facebookCreate,
	addTags,
	getTags,
	likeMe,
	addLike,
	getLikes,
	addVisit,
	getVisits,
	getOnlineUsers,
	// PATHS //
	find,
	newSession,
	update,
	getProfiles,
	getProfilesCount,
};
