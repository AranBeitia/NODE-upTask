const passport = require('passport')

exports.authenticateUser = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/start-session',
	failureFlash: true,
})
