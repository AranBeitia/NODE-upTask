const express = require('express')
const router = express.Router()

/** importar express validator */
const { body } = require('express-validator')

/** importar controladores */
const ProjectController = require('../controllers/projectsController')
const tasksController = require('../controllers/tasksController')
const usersController = require('../controllers/usersController')
const authController = require('../controllers/authController')

module.exports = function () {
	router.get('/', ProjectController.home)
	router.get('/new-project', ProjectController.projectForm)
	router.post(
		'/new-project',
		body('name').not().isEmpty().trim().escape(),
		ProjectController.newProject
	)
	/** listar proyecto */
	router.get('/projects/:url', ProjectController.projectByUrl)

	/** editar proyecto */
	router.get('/project/edit/:id', ProjectController.projectEdit)

	/** actualizar proyecto */
	router.post(
		'/new-project/:id',
		body('name').not().isEmpty().trim().escape(),
		ProjectController.projectUpdate
	)

	/** borrar proyecto */
	router.delete('/projects/:url', ProjectController.projectDelete)

	/** tareas */
	router.post('/projects/:url', tasksController.addTask)

	/** actualizar tarea */
	router.patch('/tasks/:id', tasksController.changeStateTask)

	/** borrar tarea */
	router.delete('/tasks/:id', tasksController.deleteTask)

	/** crear nueva cuenta */
	router.get('/create-account', usersController.createAccountForm)
	router.post('/create-account', usersController.createAccount)

	/** start session */
	router.get('/start-session', usersController.startSessionForm)
	router.post('/start-session', authController.authenticateUser)

	return router
}
