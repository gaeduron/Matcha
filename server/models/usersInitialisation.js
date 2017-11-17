const queryPreparations = [
	`PREPARE usercreate (
		text,
		text,
		text,
		text,
		text
	) AS INSERT INTO users (
		email,
		firstname,
		lastname,
		login,
		password
	) VALUES ($1, $2, $3, $4, $5);`,

	`PREPARE userread (int) 
	AS SELECT * FROM users WHERE id = $1;`
];

const usersInitialisation = (database) => {
	queryPreparations.forEach((query) => {
		database.query(query);
	})
}

module.exports = usersInitialisation;
