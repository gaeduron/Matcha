const bcrypt = require('bcryptjs');


const verifyPassword = async function (password, hash) {
	let result = await bcrypt.compare(password, hash);
	
	return result;
}; 

// Non asynchrone - on le rend async ? 
const hashPassword = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);

	return hash;
};



let password = 'Hardpouet';
let hash = hashPassword(password);
console.log('hash', hash);

let compare = verifyPassword(password, hash);
compare.then(res => console.log(res));

