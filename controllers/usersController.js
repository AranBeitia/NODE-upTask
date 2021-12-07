const Users = require('../models/Users')

exports.createAccountForm = (request, response) => {
	response.render('createAccount', {
		pageName: 'Create account',
	})
}

exports.createAccount = (request, response) => {
	// leer datos
	const { email, password } = request.body
	// crear usuario
	Users.create({ email, password }).then(() =>
		response.redirect('/start-session')
	)
}
