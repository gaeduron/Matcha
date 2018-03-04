const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (app) => {
	app.use(passport.initialize());

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use(new FacebookStrategy(
		{
			clientID: '504347826627650',
			clientSecret: '3eb8794d2a51ff14c0f064bc580f293c',
			callbackURL: "http://localhost:8080/auth/facebook/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(profile);
			done(null, profile);
		}
	));

	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }));
};
