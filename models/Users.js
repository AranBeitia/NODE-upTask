const Sequelize = require('sequelize')
const db = require('../config/db')
const Projects = require('./Projects')

const Users = db.define('users', {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: Sequelize.STRING(60),
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING(60),
		allowNull: false,
	},
})

// Users.hasMany(Projects)

module.exports = Users
