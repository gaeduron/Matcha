const myError = require('../../../errors');

const error = {
	tooLong: myError.newFailure({
		log: length => `User tag is too long (${length}) characters`,
		message: length => `One of you tags is too long (${length}), 
		64 characters max.`,
	}),
	format: myError.newFailure({
		log: 'User tags contain forbidden characters',
		message: 'Your tags should only contain letters, numbers, dots, dashs, underscores.',
	}),
};

const validateTags = (tags) => {
	const regex = /^[A-Za-z0-9.-_ ]+$/;

	 for (let tag of tags) {
		if (tag.length > 64) { return error.tooLong(tag.length); }
		if (!regex.test(tag)) { return error.format(); }
	}

	return { error: false };
};

module.exports = validateTags;
