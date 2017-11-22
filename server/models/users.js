const bcrypt = require('bcryptjs');
const database = require('../postgresql/postgresql');
const logger = require('../logs/logger');

// Non asynchrone - on le rend async ? 
const hashPassword = async (password) => {
	let salt = await bcrypt.genSalt(10);
	let hash = await bcrypt.hash(password, salt);

	return hash;
};

const createUser = async ({ email, firstname, lastname, login, password }) => {
	const query = `
		INSERT INTO users (
	    	email,
		    firstname,
		    lastname,
		    login,
		    password
		) VALUES ($1, $2, $3, $4, $5);`;

	password = await hashPassword(password);
	try {
		await database.query(query, [email, firstname, lastname, login, password]);
		logger.info(`User Creation succesful !`);
		return {
			result: true,
			messages: [`Your account has been successfuly created !`]
		};
	} catch (e) {
		logger.error(`Database error at User Creation => ${e}`);
		return { result: false, messages: ['Error, please try again later'] };
	};
};

const emailValidation = async (email) => {
	const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

	if (!email)
		return 'INVALIDE INPUT: email is empty';
	if (email.length > 254)
		return 'INVALIDE INPUT: email is too long, 254 characteres max';
	if (!regex.test(email))
		return 'INVALIDE INPUT: your email has invalide format';

	const query = `SELECT email FROM users WHERE email = $1;`;
	const emailAlreadyTaken = await database.query(query, [email]);
	if (emailAlreadyTaken.rowCount > 0)
	{
		console.log(emailAlreadyTaken.rowCount);
		return 'INVALIDE INPUT: this email is already registered';
	}

	return null;
};

const nameValidation = (name) => {
	const regex = /^[a-zA-Z]+$/

	if (name.length > 254)
		return 'INVALIDE INPUT: your name is too long, 254 characters max';
	if (!regex.test(name))
		return 'INVALIDE INPUT: name should only contain letters';
	return null;
};

const loginValidation = async (login) => {
	const regex = /^[A-Za-z0-9.-_]+$/

	if (login.length > 254)
		return 'INVALIDE INPUT: your login is too long, 254 characteres max';
	if (!regex.test(login))
		return 'INVALIDE INPUT: login should only contain letters, numbers, dots, dashs, underscores';
	
	const query = `SELECT login FROM users WHERE login = $1;`;
	const loginAlreadyTaken = await database.query(query, [login]);
	if (loginAlreadyTaken.rowCount > 0)
	{
		console.log(loginAlreadyTaken.rowCount);
		return 'INVALIDE INPUT: this login is already registered';
	}
	
	console.log('by');
	return null;
};

const passwordValidation = (password) => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

	if (password.length > 254 && password.length < 8)
		return 'INVALIDE INPUT: password length should be between 8 and 254 characters';
	if (!regex.test(password))
		return 'INVALIDE INPUT: password must contain at least one: lowercase letter, uppercase letter, number';
	return null;
};

const clean = (messages) => {
	let i = 0;
	while (i < messages.length) {
		if (messages[i] === null) {
			messages.splice(i, 1);
			i = 0;
		} else { 
			i++;
		};
	}
}

const validateUser = async ({ email, firstname, lastname, login, password }) => {
	const messages = [];
	const emailValidationRes = await emailValidation(email);
	const loginValidationRes = await loginValidation(login);

	messages.push(emailValidationRes);
	messages.push(loginValidationRes);
	messages.push(nameValidation(firstname));
	messages.push(nameValidation(lastname));
	messages.push(passwordValidation(password));
	clean(messages);

	if (!(messages.length)) {
		return { result: true };
	} else {
		return { result: false, messages };
	};
};

const startUserCreation = async (user) => {
	const response =  await validateUser(user);
	if (response.result) {
		return await createUser(user);
	} else {
		logger.warn(`User failed at ${response.messages.length} validations: ${response.messages}`);
		return response;
	};
};

module.exports = { startUserCreation };
