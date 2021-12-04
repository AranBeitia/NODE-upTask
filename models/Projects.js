const Sequelize = require('sequelize')
const db = require('../config/db')

const Projects = db.define('projects', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: Sequelize.STRING,
	url: Sequelize.STRING,
})

module.exports = Projects
