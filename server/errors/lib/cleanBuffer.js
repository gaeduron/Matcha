const cleanBuffer = (buffer) => {
	let i = 0;
	while (i < buffer.length) {
		if (buffer[i].error === false) {
			buffer.splice(i, 1);
			i = 0;
		} else {
			i += 1;
		}
	}
};

module.exports = cleanBuffer;
