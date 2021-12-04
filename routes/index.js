const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
/** importar express validator */
const { body } = require('express-validator/check')

module.exports = function () {
	router.get('/', controller.home)
	router.get('/new-project', controller.projectForm)
	router.post(
		'/new-project',
		body('name').not().isEmpty().trim().escape(),
		controller.newProject
	)

	return router
}
