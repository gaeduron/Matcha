const fs = require('fs');

let file = 'lyrics.txt';
let lyrics = 'But still I\'m having memories of high speeds when the cops crashed\n' +  
			'As I laugh, pushin the gas while my Glocks blast\n' + 
			'We was young and we was dumb but we had heart';


const writeReadFile = async function (file) {
	await fs.writeFile(file, lyrics, (err) =>   


	if (err) throw err;
	console.log('file writed');
	fs.readFile(file, 'utf8', (err, data) => {
		console.log(data);
	});
});

