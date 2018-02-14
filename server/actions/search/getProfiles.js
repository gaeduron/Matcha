const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using socketID',
		message: 'An error occured please try again later',
	}),
};

const fakeProfiles = [
						{
							firstname: 'Paola',
							lastname: 'Gracias',
							birthdate: '1994-06-09T22:00:00.000Z',
							occupation: 'Writer at New York Times',
							photos: ["http://image.ibb.co/dKurob/Screen_Shot_2018_01_22_at_5_33_26_PM.png"],
						},
						{
							firstname: 'Yennifer',
							lastname: 'Berolo',
							birthdate: '1993-06-09T22:00:00.000Z',
							occupation: 'Student at UCLA',
							photos: ["https://images.unsplash.com/photo-1511424187101-2aaa60069357?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=37a36fd0d1ca10b2dbb297935c028815&auto=format&fit=crop&w=2770&q=80"],
						},
						{
							firstname: 'Claire',
							lastname: 'Pintel',
							birthdate: '1995-06-09T22:00:00.000Z',
							occupation: 'Model ASOS',
							photos: ["https://images.unsplash.com/photo-1502768040783-423da5fd5fa0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c6416353c255d2746a68c8a83943bdf&auto=format&fit=crop&w=934&q=80"],
						},
						{
							firstname: 'Paola',
							lastname: 'Gracias',
							birthdate: '1994-06-09T22:00:00.000Z',
							occupation: 'Writer at New York Times',
							photos: ["http://image.ibb.co/dKurob/Screen_Shot_2018_01_22_at_5_33_26_PM.png"],
						},
						{
							firstname: 'Yennifer',
							lastname: 'Berolo',
							birthdate: '1993-06-09T22:00:00.000Z',
							occupation: 'Student at UCLA',
							photos: ["https://images.unsplash.com/photo-1511424187101-2aaa60069357?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=37a36fd0d1ca10b2dbb297935c028815&auto=format&fit=crop&w=2770&q=80"],
						},
						{
							firstname: 'Claire',
							lastname: 'Pintel',
							birthdate: '1995-06-09T22:00:00.000Z',
							occupation: 'Model ASOS',
							photos: ["https://images.unsplash.com/photo-1502768040783-423da5fd5fa0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c6416353c255d2746a68c8a83943bdf&auto=format&fit=crop&w=934&q=80"],
						},
						{
							firstname: 'Paola',
							lastname: 'Gracias',
							birthdate: '1994-06-09T22:00:00.000Z',
							occupation: 'Writer at New York Times',
							photos: ["http://image.ibb.co/dKurob/Screen_Shot_2018_01_22_at_5_33_26_PM.png"],
						},
						{
							firstname: 'Yennifer',
							lastname: 'Berolo',
							birthdate: '1993-06-09T22:00:00.000Z',
							occupation: 'Student at UCLA',
							photos: ["https://images.unsplash.com/photo-1511424187101-2aaa60069357?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=37a36fd0d1ca10b2dbb297935c028815&auto=format&fit=crop&w=2770&q=80"],
						},
						{
							firstname: 'Claire',
							lastname: 'Pintel',
							birthdate: '1995-06-09T22:00:00.000Z',
							occupation: 'Model ASOS',
							photos: ["https://images.unsplash.com/photo-1502768040783-423da5fd5fa0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c6416353c255d2746a68c8a83943bdf&auto=format&fit=crop&w=934&q=80"],
						},
	
];

const getWantedGender = (orientation, gender) => {
	if (orientation = 'straight') {
		return gender == 'woman' ? ['man', 'man'] : ['woman', 'woman'];
	} else if (orientation = 'gay') {
		return gender == 'man' ? ['man', 'man'] : ['woman', 'woman'];	
	} else {
		return ['man' ,'woman'];
	}
}

const validateSort = (sort) => {
	if (sort === 'distance' || sort === 'birthdate' || sort === 'score') {
		return sort;
	}
	return 'score';
}

const formatFilters = ({
	distanceRange,
	ageRange,
	popularityRange,
	sort,
	nextProfileIndex,
	sexualOrientation,
	gender,
	position,
}) => {

	const sex = getWantedGender(sexualOrientation, gender);
	const validSort = validateSort(sort);

	return {
		birthdate: {
			min: `${ageRange[0]} years`,
			max: `${ageRange[1]} years`,
		},
		longitude: {
			min: 2,
			max: 3,
		},
		latitude: {
			min: 48,
			max: 49,
		},
		score: {
			min: popularityRange[0],
			max: popularityRange[1],
		},
		sex: ['man','woman'],//sex,
		orderBy: validSort,
		limit: nextProfileIndex + 12,
	}
};

const getProfiles = async (filters) => {
	logger.info(`Adding user sexual preferences to filters`);	
	const res = await Users.find(filters);
	if (res.error) { return error.userNotFound;	}
	filters.sexualOrientation = res.user.sexualOrientation;
	filters.gender = res.user.sex;
	filters.position =	{
		longitude: res.user.longitude,						
		latitude: res.user.latitude,						
	};
	
	logger.info(`formating filters: ${JSON.stringify(filters, null, 2)}`);
	const formatedFilters = formatFilters(filters)

	logger.info('fetching profiles data in db...');
	const sql = await Users.getProfiles(formatedFilters);
	if (sql.error) { return sql	}

	if (sql.profiles[0]) {
		sql.profiles.forEach((profile) => {
			profile.photos = JSON.parse(profile.photos);
		});
	}

//	const data = [];
//	data.push.apply(data, fakeProfiles);
//	if (filters.nextProfileIndex > 0) {
//		let i = 1;
//		while (filters.nextProfileIndex >= 9 * i) {
//			data.push.apply(data, fakeProfiles);
//			i++;
//		}
//	}
	
	return  { data:
				{
					profiles: sql.profiles,
				}
			};
};

module.exports = getProfiles;
