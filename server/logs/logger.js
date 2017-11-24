const winston = require('winston');
const { combine, timestamp, printf, colorize } = winston.format;

const myPrintedFormat = printf(info => {
	  return `[${info.timestamp}] [${info.level}]: ${info.message}`;
});

const myCustomLevels = {
	  levels: {
		      error: 0,
		      warn: 1,
			  succes: 2,
			  failure: 3,
		      info: 4
		    },
	  colors: {
		      error: 'red',
		      warn: 'yellow',
		      succes: 'green',
		  	  failure: 'magenta',
		  	  info: 'grey'
		    }
};
winston.addColors(myCustomLevels);

const myFileFormat = combine(colorize(), timestamp(), myPrintedFormat);
const myConsoleFormat = combine(timestamp(), myPrintedFormat);

const logger = winston.createLogger({
	level: 'info',
	levels: myCustomLevels.levels,
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
