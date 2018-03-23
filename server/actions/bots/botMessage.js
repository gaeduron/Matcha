const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	wrongUserId: myError.newFailure({
		log: 'visit - user tried to send a wrong input',
		message: 'Whoops something happened',
	}),
};

const botMessageList = [
    'Hi there! Cats or Dogs?',
    'Cats AND dogs, is the only good answer ;)',
    'To be honest... I\'m not a very good listener.',
    'And I won\'t answer any of your questions, because...',
    '...I\'m a bot, reading messages from an array',
    'And it looks like it\'s the last message in the array. I\'ll keep looping on this one from now on. (or do I?)',
    'Hey you\'re still here 😇. Maybe you want me to tell you about the guys who wrote this app?',
    'I think they make a good team, eager to learn, patient, pay attention to details... I wonder what will be their next project. I\'ve heard that they are looking for an internship to dive deeper in software architecture, scalability and performance. Here are their linkedin if you are interested: "linkedin.com/in/gduron/" and "linkedin.com/in/benjamin-duron/"',
];

const botMessage = async ({ sender, receiver }) => {
	logger.info(`botMessage start: sender ${JSON.stringify(sender)} receiver ${JSON.stringify(receiver)}`);
	if (receiver.login != 639 && receiver.login != 951)	{
		return { notBot: true };
	}

	let messageCount = await Users.getConversation({
		receiver: sender.login,
		sender: receiver.login,
	});
	messageCount = messageCount.messages.length;
	logger.info(`messageCount = ${JSON.stringify(messageCount)}`);
	if (messageCount > 7) {
		messageCount = 7;
	}

	const botMessage = botMessageList[messageCount];

	logger.info('adding message in DB... Hi there ! Cats or Dogs ?');
	const updateResponse = await Users.addMessage({
		receiver: sender.login,
		sender: receiver.login,
		message: botMessage,
	});

	receiver.message = botMessage;

	return { data: receiver };
};

module.exports = botMessage;
