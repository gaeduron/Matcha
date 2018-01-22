const myError = require('../../../errors');

const error = {
	tooYoung: myError.newFailure({
		log: `User must be at least 18`,
		message: 'You must be at least 18'
	}),
	format: myError.newFailure({
		log: 'User has submitted an invalid date format',
		message: 'Your birthdate format is invalid'
	}),
	empty: myError.newFailure({
		log: 'User hasn\'t submitted a birthdate',
		message: 'You haven\'t submitted a birthdate'
	})
};

const findAge = (birthdate) => {
	let now = new Date(Date.now());
	let timeDiff = Math.abs(now.getTime() - birthdate.getTime());
	let age = Math.floor(timeDiff / (1000 * 3600 * 24 * 365)); 
	
	return age;
};

const isAgeAllowed = (birthdate) => {
	let minAge = 18;
	let maxAge = 99;
	let age = findAge(birthdate);	
	
	return (age >= minAge) && (age <= maxAge) ? true : false;
};

const validateBirthdate = ({ birthdate }) => {
	if (!birthdate)
		return error.empty();
	
	const date = new Date(birthdate);
	if (date.getTime() !== date.getTime())
		return error.format();
	if (!isAgeAllowed(date))
		return error.tooYoung(); 
	return { error: false };
};

module.exports = validateBirthdate;
