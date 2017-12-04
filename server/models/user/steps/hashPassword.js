const bcrypt = require('bcryptjs');

const hashPassword = async ({ password }) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	return hash;
};

module.exports = hashPassword;
