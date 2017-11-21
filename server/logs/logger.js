const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

const myPrintedFormat = printf(info => {
	  return `[${info.timestamp}] [${info.level}]: ${info.message}`;
});
const myFileFormat = combine(colorize(), timestamp(), myPrintedFormat);
const myConsoleFormat = combine(timestamp(), myPrintedFormat);

const logger = winston.createLogger({
	level: 'info',
	format: myFileFormat,
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error', colorize: true}),
		new winston.transports.File({ filename: 'combined.log', colorize: true})
	]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		colorize: true,
		format: myConsoleFormat,
	}));
}

module.exports = logger;
