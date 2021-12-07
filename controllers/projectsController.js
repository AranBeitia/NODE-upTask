const { Result } = require('express-validator')
const Projects = require('../models/Projects')
const Tasks = require('../models/Tasks')

exports.home = async (request, response) => {
	// console.log(response.locals.user)
	const userId = response.locals.user.id
	const projects = await Projects.findAll({ where: { userId: userId } })

	response.render('index', {
		pageName: 'Projects ' + response.locals.year,
		projects,
	})
}

exports.projectForm = async (request, response) => {
	const userId = response.locals.user.id
	const projects = await Projects.findAll({ where: { userId: userId } })

	response.render('newProject', {
		pageName: 'New Project',
		projects,
	})
}

exports.newProject = async (request, response) => {
	const userId = response.locals.user.id
	const projects = await Projects.findAll({ where: { userId: userId } })

	// validar que tengamos algo en el input
	const { name } = request.body

	let errors = []

	if (!name) {
		errors.push({ texto: 'add name of the project' })
	}

	// si hay errores
	if (errors.length > 0) {
		response.render('newProject', {
			pageName: 'New Project',
			errors,
			projects,
		})
	} else {
		// no hay errores
		// insertar en la BD.
		const userId = response.locals.user.id
		await Projects.create({ name, userId })
		response.redirect('/')
	}
}

exports.projectByUrl = async (request, response) => {
	const userId = response.locals.user.id
	const projectsPromise = Projects.findAll({ where: { userId: userId } })

	const projectPromise = Projects.findOne({
		where: {
			url: request.params.url,
			userId,
		},
	})

	const [projects, project] = await Promise.all([
		projectsPromise,
		projectPromise,
	])

	// consulta tareas del proyecto actual
	const tasks = await Tasks.findAll({
		where: { projectId: project.id },
		// include: [{ model: Projects }],  join en orm
	})

	if (!project) return next()

	response.render('tasks', {
		pageName: 'Tasks project',
		project,
		projects,
		tasks,
	})
}

exports.projectEdit = async (request, response) => {
	const userId = response.locals.user.id
	const projectsPromise = Projects.findAll({ where: { userId: userId } })

	const projectPromise = Projects.findOne({
		where: {
			id: request.params.id,
		},
	})

	const [projects, project] = await Promise.all([
		projectsPromise,
		projectPromise,
	])

	response.render('newProject', {
		pageName: 'Edit project',
		project,
		projects,
	})
}

exports.projectUpdate = async (request, response) => {
	const userId = response.locals.user.id
	const projects = Projects.findAll({ where: { userId: userId } })

	const { name } = request.body
	let errors = []
	if (!name) {
		errors.push({ texto: 'update project' })
	}

	if (errors.length > 0) {
		response.render('newProject', {
			pageName: 'Update project',
			errors,
			projects,
		})
	} else {
		await Projects.update({ name: name }, { where: { id: request.params.id } })
		response.redirect('/')
	}
}

exports.projectDelete = async (request, response, next) => {
	// request, query o params
	// console.log(request.query)
	const { projectUrl } = request.query
	const result = await Projects.destroy({ where: { url: projectUrl } })

	if (!result) next()

	response.status(200).send('Your project has been deleted.')
}
