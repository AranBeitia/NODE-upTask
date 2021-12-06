const Users = require('../models/Users')

exports.createAccount = (request, response) => {
	response.render('createAccount', {
		pageName: 'Create account in UpTask',
	})
}

exports.addAccount = (request, response) => {
	// leer datos
	const { email, password } = request.body
	// crear usuario
	Users.create({
		email,
		password,
	}).then(() => response.redirect('/start-session'))
}
