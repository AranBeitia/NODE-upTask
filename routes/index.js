const express = require('express')
const router = express.Router()
const controller = require('../controllers/projectsController')
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
	/** listar proyecto */
	router.get('/projects/:url', controller.projectByUrl)

	/** editar proyecto */
	router.get('/project/edit/:id', controller.projectEdit)

	/** actualizar proyecto */
	router.post(
		'/new-project/:id',
		body('name').not().isEmpty().trim().escape(),
		controller.projectUpdate
	)

	return router
}
