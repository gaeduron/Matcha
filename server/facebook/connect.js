const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const facebookLogin = require('../actions/authentication/facebookLogin');

module.exports = (app) => {
	app.use(passport.initialize());

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.use(new FacebookStrategy(
		{
			clientID: '504347826627650',
			clientSecret: 'dbf0af19847f024dd80625b8c9d5936e',
			callbackURL: "http://localhost:8080/auth/facebook/callback",
			profileFields: [
				'id',
				'emails',
				'name',
				'gender',
			],
		},
		async (accessToken, refreshToken, profile, done) => {
			const res = await facebookLogin(profile._json);
			if (res.error) { done(null, false, res.error.log) }
			profile.uid = res.uid;
			done(null, profile);
		}
	));

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['email', 'public_profile'] 
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
		console.log(req.user);
		res.redirect(`/auth/facebook/callback/${req.user.uid}/`);	
	});
};
