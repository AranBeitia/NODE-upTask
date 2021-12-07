const passport = require('passport')
const Users = require('../models/Users')
const crypto = require('crypto')

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

exports.sendToken = async (request, response) => {
	// verificar usuario existe
	const user = await Users.findOne({ where: { email: request.body.email } })

	// si no existe usuario
	if (!user) {
		request.flash('error', 'account doesnt exist')
		response.render('restorePassword', {
			pageName: 'Restore password',
			messages: request.flash(),
		})
	}

	// si usuario existe
	const token = crypto.randomBytes(20).toString('hex')
	const expiration = Date.now() + 3600000
	console.log(token)
}
