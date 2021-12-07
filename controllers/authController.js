const passport = require('passport')

exports.authenticateUser = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/start-session',
	failureFlash: true,
	badRequestMessage: 'Both fields are required',
})

exports.userAuthenticated = (request, response, next) => {
	// si autenticado, adelante
	if (request.isAuthenticated()) {
		return next()
	}

	// si no autenticado, redirigir al formulario
	return response.redirect('/start-session')
}

exports.closeSession = (request, response) => {
	request.session.destroy(() => {
		response.redirect('/start-session')
	})
}
