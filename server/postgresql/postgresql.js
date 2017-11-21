const { Client } = require('pg');
const usersInitialisation = require('../models/usersInitialisation');

const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true,
});

client.connect();

module.exports = client;
