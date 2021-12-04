const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

module.exports = function () {
	router.get('/', controller.home)
	router.get('/new-project', controller.projectForm)
	router.post('/new-project', controller.newProject)

	return router
}
