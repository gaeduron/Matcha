require('dotenv').config({ path: '.env.development' });
const path = require('path');
const express = require('express');
const database = require('./postgresql/postgresql.js');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
	console.log('Server is up!');
	database.query("insert into test (id, content) values (2, 'test server');", (err, res) => {
		console.log(err, JSON.stringify(res));
	});
	database.query("insert into test (id, content) values (3, 'second test');", (err, res) => {
		console.log(err, JSON.stringify(res));
	});
});
