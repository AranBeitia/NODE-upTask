const express = require('express')
const router = express.Router()

/** importar express validator */
const { body } = require('express-validator/check')

/** importar controladores */
const controller = require('../controllers/projectsController')
const tasksController = require('../controllers/tasksController')

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

	/** borrar proyecto */
	router.delete('/projects/:url', controller.projectDelete)

	/** tareas */
	router.post('/projects/:url', tasksController.addTask)

	/** actualizar tarea */
	router.patch('/tasks/:id', tasksController.changeStateTask)

	/** borrar tarea */
	router.delete('/tasks/:id', tasksController.deleteTask)

	return router
}
