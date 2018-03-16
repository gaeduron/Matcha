import age from 's-age';
import ago from 's-ago';



/* Like */

export const likesMeSelector = (likes, profileId) => {
	const like = likes.filter(x => x.sender == profileId)
	console.log('is Liked ? ', like, profileId, likes);

	if (like.length == 0)
		return false;

	return like
			.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
			.unliked 
		? false
		: true;
};

export const isLikedSelector = (likes, profileId) => {
	const like = likes.filter(x => x.receiver == profileId)
	console.log('is Liked ? ', like, profileId, likes);

	if (like.length == 0)
		return false;

	return like
			.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
			.unliked 
		? false
		: true;
};


/* Likes & visits selector */

export const likesSelector = ({ likes, onlineUsers, blocked }, id) => {

	const LIKE = 'liked your profile',
		UNLIKE = 'unliked your profile',
		VISIT = 'visited your profile';
	let news = [];
		
	likes.forEach(x => { 
		if (x.receiver == id)
			news.push({
				notifType: 'like',
				notifId: x.id,
				id: x.sender,
				fname: x.firstname,
				lname: x.lastname,
				age: age(x.birthdate),
				occupation: x.occupation,
				photo: JSON.parse(x.photos)[0], 
				connected: onlineUsers.includes(x.sender),
				clicked: x.clicked,
				type: x.unliked == true ? UNLIKE : LIKE ,
				time: ago(new Date(x.created_at)),
				created_at: new Date(x.created_at).getTime(),
				content: false,
			});
	});

	news
		.sort((a, b) => b.created_at - a.created_at);
	//	.filter(x => blocked.includes(x));

	return news;
};

export const visitsSelector = ({ visits, onlineUsers }, id) => {

	const LIKE = 'liked your profile',
		UNLIKE = 'unliked your profile',
		VISIT = 'visited your profile';
	let news = [];
		
	visits.forEach(x => { 
		if (x.receiver == id)
			news.push({
				notifType: 'visit',
				notifId: x.id,
				id: x.sender,
				fname: x.firstname,
				lname: x.lastname,
				age: age(x.birthdate),
				occupation: x.occupation,
				photo: JSON.parse(x.photos)[0], 
				connected: onlineUsers.includes(x.sender),
				clicked: x.clicked,
				type: VISIT,
				time: ago(new Date(x.created_at)),
				created_at: new Date(x.created_at).getTime(),
				content: false,
			});
	});

	news.sort((a, b) => b.created_at - a.created_at);

	return news;
};


/* News selector */

export const newsSelector = ({ visits, likes, matches, blocked, onlineUsers }, id) => {

	const LIKE = 'liked your profile',
		UNLIKE = 'unliked your profile',
		VISIT = 'visited your profile',
		MATCH = 'matched with you';
	let news = [];
		
	likes.forEach(x => { 
		if (x.receiver == id)
			news.push({
				notifType: 'like',
				notifId: x.id,
				id: x.sender,
				fname: x.firstname,
				lname: x.lastname,
				age: age(x.birthdate),
				occupation: x.occupation,
				photo: JSON.parse(x.photos)[0], 
				connected: onlineUsers.includes(x.sender),
				clicked: x.clicked,
				type: x.unliked == true ? UNLIKE : LIKE ,
				time: ago(new Date(x.created_at)),
				created_at: new Date(x.created_at).getTime(),
				content: false,
			});
	});

	visits.forEach(x => { 
		if (x.receiver == id)
			news.push({
				notifType: 'visit',
				notifId: x.id,
				id: x.sender,
				fname: x.firstname,
				lname: x.lastname,
				age: age(x.birthdate),
				occupation: x.occupation,
				photo: JSON.parse(x.photos)[0], 
				connected: onlineUsers.includes(x.sender),
				clicked: x.clicked,
				type: VISIT,
				time: ago(new Date(x.created_at)),
				created_at: new Date(x.created_at).getTime(),
				content: false,
			});
	});

	matches.forEach(x => { 
		if (x.receiver == id)
			news.push({
				notifType: 'match',
				notifId: x.id,
				id: x.sender,
				fname: x.firstname,
				lname: x.lastname,
				age: age(x.birthdate),
				occupation: x.occupation,
				photo: JSON.parse(x.photos)[0], 
				connected: onlineUsers.includes(x.sender),
				clicked: x.clicked,
				type: MATCH,
				time: ago(new Date(x.created_at)),
				created_at: new Date(x.created_at).getTime() + 10000,
				content: false,
			});
	});

	return news
		.filter(x => !blocked.includes(x.id))
		.sort((a, b) => b.created_at - a.created_at);
};


/* Match Selector and helpers */

const findMatches = (likes, id) => {	

	const likeSent = likes.filter(x => x.sender == id),
	      likeReceived = likes.filter(x => x.receiver == id);

	let matches = likeSent
		/* Find matches */
		.reduce((acc, like) => {
			const match = likeReceived.find(x => x.sender == like.receiver); 	
			return match ? [...acc, like] : acc;
		}, [])
		/* Clean matches (deduplicate and get id) */
		.map(match => match.receiver)
		.reduce((acc, match) => acc.includes(match) ? acc : [match, ...acc], []);

	return matches;
};


const findLastMessage = (match, likes, messages, id) => {	

	const lastMessage = messages
		.filter(x => (x.receiver == match && x.sender == id) || (x.receiver == id && x.sender == match))
		.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
		[0];

	if (lastMessage)
		return {...lastMessage, match, isMatch: false};

	const lastMatch = likes
		.filter(x => (x.receiver == match && x.sender == id) || (x.receiver == id && x.sender == match))
		.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
		[0];

	return {...lastMatch, match, isMatch: true};
};


const formatMatch = (x, onlineUsers, id) => {	
	
	return ({ 
		notifType: 'chat',
		notifId: x.id,
		id: x.match,
		fname: x.firstname,
		lname: x.lastname,
		age: age(x.birthdate),
		occupation: x.message ? x.message : `You and ${x.firstname} just matched`,
		photo: JSON.parse(x.photos)[0], 
		connected: onlineUsers.includes(x.receiver),
		clicked: x.isMatch ? false : (x.sender == id ? true : x.clicked),
		created_at: x.created_at
	}); 
};

const findLastLikes = (likes) => {
	
	const groupedByLikes = likes
		.reduce((acc, x) => {
			const val = `${x.sender}to${x.receiver}`;
			acc[val] = acc[val] || [];
			acc[val].push(x);
			return acc;
		}, {});

	const lastLikes = [];
	for (let x in groupedByLikes) {
		let lastLike = groupedByLikes[x].sort((a, b) => b.id - a.id)[0];
		if (!lastLike.unliked)
			lastLikes.push(lastLike);	
	}

	return lastLikes
};

export const matchSelector = ({ likes, messages, onlineUsers, blocked }, id) => {	

	const lastLikes = findLastLikes(likes);

	const matches = findMatches(lastLikes, id)
		.map(match => findLastMessage(match, likes, messages, id))
		.map(match => formatMatch(match, onlineUsers, id))
		.filter(x => !blocked.includes(x.id))
		.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

	console.log('matches', matches);
	
	return matches;
};



const mockMatch = {
	id: 527,
	fname: 'Bill',
	lname: 'Becker',
	age: 32,
	occupation: 'Waterside Worker',
	photo: 'https://res.cloudinary.com/matcha/image/upload/v1518690862/yasxzl2kl4jip1k65b4t.jpg',
	connected: false,
	clicked: false,
};



/* Messages selector */

const formatMessage = (msg, id) => ({
	time: msg.created_at,
	from: msg.sender == id ? 'you' : msg.firstname,
	text: msg.message
});

export const messagesSelector = ({ messages }, id, matches) => {

	let messagesObj = {},	
	    matchesArr = matches.map(x => x.id);  
	
	matchesArr.forEach(userId => {
		messagesObj[userId] = messages
			.filter(x => (x.receiver == userId && x.sender == id) || (x.receiver == id && x.sender == userId))
			.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
			.map(x => formatMessage(x, id));
	});	

	messagesObj['0'] = [];
	//messagesObj['0'] = [{time: "2018-01-28T14:30:11.202Z", from: "you", text: "..."}];
	return messagesObj;
};

//	{time: "2018-01-29T12:12:11.202Z", from: "you", text: "I just arrived my self last week."},



/* News and Messages badges number selector */

export const newsBadgesSelector = ({ likes, visits, matches }, id, ) => {

	const unseenLikes = likes.filter(x => x.receiver == id && x.seen == false);
	const unseenVisits = visits.filter(x => x.receiver == id && x.seen == false);
	const unseenMatches = matches.filter(x => x.receiver == id && x.seen == false);
	
	return unseenLikes.length + unseenVisits.length + unseenMatches.length;
};

export const messagesBadgesSelector = ({ messages }, id, ) => {

	const unseenMessages = messages.filter(x => x.receiver == id && x.seen == false);
	
	return unseenMessages.length;
};






//function newsEqual(a, b) {
//	return [
//		a.receiver = b.receiver,
//		a.sender = b.sender,
//		a.type = b.type
//	].reduce((acc, bool) => bool && acc, true);
//} 

//	news.reduce((acc, x) => acc.find((a) => newsEqual(a, x)) ? acc : [x, ...acc], []);
