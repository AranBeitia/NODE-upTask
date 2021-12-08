const passport = require('passport')
const Users = require('../models/Users')
const { Sequelize } = require('sequelize/dist')
const Op = Sequelize.Op
const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')

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
	user.token = crypto.randomBytes(20).toString('hex')
	user.expiration = Date.now() + 3600000

	// guardar en base de datos
	await user.save()

	// url del reset
	const resetUrl = `http://${request.headers.host}/restore-password/${user.token}`
}

exports.validateToken = async (request, response) => {
	const user = await Users.findOne({
		where: {
			token: request.params.token,
		},
	})

	// si no encuentra usuario
	if (!user) {
		request.flash('error', 'Not valid')
		response.redirect('/restore-password')
	}

	// formulario para generar password
	response.render('resetPassword', {
		pageName: 'Reset password',
	})
}

exports.resetPassword = async (request, response) => {
	const user = await Users.findOne({
		where: {
			token: request.params.token,
			expiration: {
				[Op.gte]: Date.now(),
			},
		},
	})

	if (!user) {
		request.flash('error', 'error, time expired')
		response.redirect('/restore-password')
	}

	// reset, hash de password y borrado de token
	user.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10))
	user.token = null
	user.expiration = null

	// guardar nuevo password
	await user.save()

	request.flash('correcto', 'your password has changed correctly')
	response.redirect('/start-session')
}
