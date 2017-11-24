const bcrypt = require('bcryptjs');
const database = require('../postgresql/postgresql');
const logger = require('../logs/logger');
const error = require('../errors/models/auth');

const findUserByEmailOrLogin = async ({ email, password }) => {
	const query = `SELECT password, id FROM users WHERE login = $1 OR email = $1;`;

	try {
		const res = await database.query(query, [email]);	

		if (!res.rows[0]) { return error.userNotFound };

		return {
			hash: res.rows[0].password,
			password: password,
			uid: res.rows[0].id
		};
	} catch (e) {
		return error.database(e);	
	};
}

const identifyUser = async (user) => {
	let response = await findUserByEmailOrLogin(user);
	if (response.error)
		return response;

	if ( await bcrypt.compare(response.password, response.hash) ) {
		return response;
	} else {
		return error.invalidePassword;
	};
};

const saveSocket = async (id, socketID) => {
	const query = `UPDATE users SET connected = $1 WHERE id = $2`;

	try {
		await database.query(query, [ socketID, id ]);
		return error.none;
	} catch (e) {
		return error.database(e);
	};
};

const generateCookie = (uid) => {
	return uid;
};

const startLogin = async (user) => {
	let response = await identifyUser(user);
	if (response.error) { return response };
	const uid = response.uid;
	logger.info(`User is valide`);
	
	response = await saveSocket(uid, user.socketID);
	if (response.error) { return response };
	logger.info(`Socket is saved`);

	return await generateCookie(uid);
};

const findUserByID = async (id) => {
	const query = `SELECT * FROM users WHERE id = $1;`;

	try {
		const res = await database.query(query, [id]);	

		if (!res.rows[0]) { return error.userNotFound };

		return res;
	} catch (e) {
		return error.database(e);
	};
}

const getUser = ({uid, email, login}) => {
 	let identifier = null;
	if (email) { identifier = email };
	if (login) { identifier = login };
	if (uid) { identifier = parseInt(uid) };
	
	return findUserByID(id);
};

const startLoginWithCookie = async (cookie) => {
	let response = await getUser(cookie);
	if (response.error) { return response };
	logger.info(`User is valide`);
	
	response = await saveSocket(response.id, cookie.socketID);
	if (response.error) { return response };
	logger.info(`Socket is saved`);

	return cookie;
};

const saveSocket = async (id) => {
	const query = `UPDATE users SET connected = null WHERE id = $1`;

	try {
		await database.query(query, [ id ]);
		return error.none;
	} catch (e) {
		return error.database(e);
	};
};

const startLogout = async (cookie) => {
	let response = await getUser(cookie);
	if (response.error) { return response };
	logger.info(`User is valide`);
	
	response = await deleteSocket(response.id);
	if (response.error) { return response };
	logger.info(`Socket is saved`);

	return {};
};

const logoutSocket = async (socketID) => {
//	let response = await getUser(cookie);
//	if (response.error) { return response };
//	logger.info(`User is valide`);
//	
//	response = await deleteSocket(response.id);
//	if (response.error) { return response };
//	logger.info(`Socket is saved`);

	return {};
};


module.exports = { startLogin, startLoginWithCookie, startLogout, logoutSocket };
