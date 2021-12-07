exports.createAccountForm = (request, response) => {
	response.render('createAccount', {
		pageName: 'Create account',
	})
}
