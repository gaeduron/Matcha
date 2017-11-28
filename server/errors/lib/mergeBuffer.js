const mergeBuffer = (buffer) => {
	const newError = { error: [] };
	let i = 0;
	while (i < buffer.length) {
		newError.error.push(buffer[i].error[i]);
		i += 1;
	}
	return newError;
};

module.exports = mergeBuffer;
