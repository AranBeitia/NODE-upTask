const Users = require('../models/Users')

exports.createAccountForm = (request, response) => {
	response.render('createAccount', {
		pageName: 'Create account',
	})
}

exports.startSessionForm = (request, response) => {
	response.render('startSession', {
		pageName: 'Start session',
		error: response.locals.messages,
	})
}

exports.createAccount = async (request, response) => {
	// leer datos
	const { email, password } = request.body
	// crear usuario
	try {
		await Users.create({ email, password })
		response.redirect('/start-session')
	} catch (error) {
		request.flash(
			'error',
			error.errors.map((error) => error.message)
		)
		response.render('createAccount', {
			messages: request.flash(),
			pageName: 'Create account',
			email: email,
			password: password,
		})
	}
}
