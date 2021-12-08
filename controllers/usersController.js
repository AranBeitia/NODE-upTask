const Users = require('../models/Users')
const sendEmail = require('../handlers/email')

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

		// crear url de confirmacion
		const confirmUrl = `http://${request.headers.host}/confirm/${email}`

		// crear objeto de usuario
		const user = { email }

		// enviar email
		await sendEmail.send({
			user,
			subject: 'Confirm account',
			confirmUrl,
			archive: 'confirm-account',
		})

		// redirigir al usuario
		request.flash('correcto', 'We sent an email, confirm your account')
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

exports.restorePassword = (request, response) => {
	response.render('restorePassword', {
		pageName: 'Restore password',
	})
}
