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
	router.get('/', authController.userAuthenticated, ProjectController.home)
	router.get(
		'/new-project',
		authController.userAuthenticated,
		ProjectController.projectForm
	)
	router.post(
		'/new-project',
		authController.userAuthenticated,
		body('name').not().isEmpty().trim().escape(),
		ProjectController.newProject
	)
	/** listar proyecto */
	router.get(
		'/projects/:url',
		authController.userAuthenticated,
		ProjectController.projectByUrl
	)

	/** editar proyecto */
	router.get(
		'/project/edit/:id',
		authController.userAuthenticated,
		ProjectController.projectEdit
	)

	/** actualizar proyecto */
	router.post(
		'/new-project/:id',
		authController.userAuthenticated,
		body('name').not().isEmpty().trim().escape(),
		ProjectController.projectUpdate
	)

	/** borrar proyecto */
	router.delete(
		'/projects/:url',
		authController.userAuthenticated,
		ProjectController.projectDelete
	)

	/** tareas */
	router.post(
		'/projects/:url',
		authController.userAuthenticated,
		tasksController.addTask
	)

	/** actualizar tarea */
	router.patch(
		'/tasks/:id',
		authController.userAuthenticated,
		tasksController.changeStateTask
	)

	/** borrar tarea */
	router.delete(
		'/tasks/:id',
		authController.userAuthenticated,
		tasksController.deleteTask
	)

	/** crear nueva cuenta */
	router.get('/create-account', usersController.createAccountForm)
	router.post('/create-account', usersController.createAccount)

	/** start session */
	router.get('/start-session', usersController.startSessionForm)
	router.post('/start-session', authController.authenticateUser)

	/** close session */
	router.get('/close-session', authController.closeSession)

	/** restore password */
	router.get('/restore-password', usersController.restorePassword)
	router.post('/restore-password', authController.sendToken)
	router.get('/restore-password/:token', authController.resetPassword)

	return router
}
