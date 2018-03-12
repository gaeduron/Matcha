const Users = require('../../models/user');
const logger = require('../../logs/logger');
const myError = require('../../errors');

const error = {
	loginNotUnique: myError.newFailure({
		log: 'User not found using socketID',
		message: 'An error occured please try again later',
	}),
};

const getWantedGender = (orientation, gender) => {
	if (orientation == 'straight') {
		return gender == 'woman' ? ['man', 'man'] : ['woman', 'woman'];
	} else if (orientation == 'gay') {
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

const convertDistances = (range) => {
	if (range[0] > 0) {
		range[0] = range[0] * 1000;
	}
	if (range[1] < 100) {
		range[1] = range[1] * 1000;
	} else {
		range[1] = 21000000;
	}
	return range;
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
	tags,
	id,
}) => {

	const sex = getWantedGender(sexualOrientation, gender);
	const validSort = validateSort(sort);
	const meterDistance = convertDistances(distanceRange);
	
	return {
		birthdate: {
			min: `${ageRange[0]} years`,
			max: `${ageRange[1]} years`,
		},
		distance: {
			min: meterDistance[0],
			max: meterDistance[1],
		},
		position: {
			lat: position.latitude,
			lon: position.longitude,
		},
		score: {
			min: popularityRange[0],
			max: popularityRange[1],
		},
		sex: sex,
		orderBy: validSort,
		limit: nextProfileIndex + 12,
		tags: tags,
		noTags: !tags.length ? 'no tags' : 'tags',
		id: id,
	}
};

const getProfiles = async (filters) => {
	logger.info(`Adding user sexual preferences to filters`);	
	const res = await Users.find(filters);
	if (res.error) { return error.userNotFound;	}
	filters.sexualOrientation = res.user.sexualOrientation;
	filters.gender = res.user.sex;
	filters.id = res.user.id;
	filters.position =	{
		longitude: res.user.longitude,						
		latitude: res.user.latitude,						
	};
	
	logger.info(`formating filters: ${JSON.stringify(filters, null, 2)}`);
	const formatedFilters = formatFilters(filters)

	logger.info(`fetching profiles data in db with... ${JSON.stringify(formatedFilters, null, 2)}`);
	const sql = await Users.getProfiles(formatedFilters);
	if (sql.error) { return sql	}

	if (sql.profiles[0]) {
		sql.profiles.forEach((profile) => {
			profile.photos = JSON.parse(profile.photos);
		});
	}

	return  { data:
				{
					profiles: sql.profiles,
				}
			};
};

module.exports = getProfiles;
