const Sequelize = require('sequelize')
const db = require('../config/db')
const slug = require('slug')
const shortId = require('shortid')

const Projects = db.define(
	'projects',
	{
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
		},
		name: Sequelize.STRING(100),
		url: Sequelize.STRING,
	},
	{
		hooks: {
			beforeCreate(project) {
				const url = slug(project.name).toLowerCase()
				project.url = `${url}-${shortId.generate()}`
			},
		},
	}
)

module.exports = Projects
