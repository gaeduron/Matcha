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

const getProfiles = async (filters) => {
	logger.info(`Adding user sexual preferences to filters`);	
	const res = await Users.find(filters);
	if (res.error) { return error.userNotFound;	}
	filters.sexualOrientation = res.user.sexualOrientation;
	
	logger.info(`filter data: ${JSON.stringify(filters, null, 2)}`);

	logger.info('fetching profiles data in db...');		
	
	return  { data:
				{
					profiles: fakeProfiles,
				}
			};
};

module.exports = getProfiles;
