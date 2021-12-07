const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

/** referencia al Modelo donde vamos a autenticar */
const Users = require('../models/Users')

// local strategy - login con credenciales propias (usuario y password)
passport.use(
	new LocalStrategy(
		// por default passport espera user y password
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await Users.findAll({
					where: { email: email },
				})
				// usuario existe pero no contraseña
				if (!user.verifyPassword(password)) {
					return done(null, false, {
						message: 'Password incorrect',
					})
				}
				// email existe y password correcto
				return done(null, user)
			} catch (error) {
				// usuario no existe
				return done(null, false, {
					message: 'User doesnt exist',
				})
			}
		}
	)
)

// serializar el usuario
passport.serializeUser((user, callback) => {
	callback(null, user)
})

// deserialize user
passport.deserializeUser((user, callback) => {
	callback(null, user)
})

module.exports = passport
