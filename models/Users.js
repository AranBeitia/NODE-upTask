const Sequelize = require('sequelize')
const db = require('../config/db')
const Projects = require('./Projects')
const bcrypt = require('bcrypt-nodejs')

const Users = db.define(
	'users',
	{
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: Sequelize.STRING(60),
			allowNull: false,
			validate: {
				isEmail: {
					msg: 'Agrega un Correo Válido',
				},
				notEmpty: {
					msg: 'El e-mail no puede ir vacio',
				},
			},
			unique: {
				args: true,
				msg: 'Usuario Ya Registrado',
			},
		},
		password: {
			type: Sequelize.STRING(60),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: "Password can't be empty",
				},
			},
		},
	},
	{
		hooks: {
			beforeCreate(user) {
				user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
			},
		},
	}
)

Users.hasMany(Projects)

module.exports = Users
