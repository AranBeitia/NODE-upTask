const Users = require('../models/Users')

exports.createAccountForm = (request, response) => {
	response.render('createAccount', {
		pageName: 'Create account',
	})
}

exports.createAccount = async (request, response) => {
	// leer datos
	const { email, password } = request.body

	try {
		// crear usuario
		await Users.create({
			email,
			password,
		})
		response.redirect('/start-session')
	} catch (error) {
		const errors = error.errors
		response.render('createAccount', {
			pageName: 'Create account',
		})
	}
}
