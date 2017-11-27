const fs = require('fs');
const fname = 'origin.json';
		
var originalNote = {
	title: 'title',
	body: 'body'
};

function writeNote(file) {
	fs.writeFile(file, JSON.stringify(originalNote), (err) => {
		if (err) throw err;
		console.log('Note written.', file);
		fs.readFile(file, 'utf8', (err, contents) => {
			var newNote = JSON.parse(contents);
			console.log('Note read : ', newNote);
		});
	});
}

writeNote(fname);
