const { Result } = require('express-validator')
const Projects = require('../models/Projects')

exports.home = async (request, response) => {
	const projects = await Projects.findAll()

	response.render('index', {
		pageName: 'Projects ' + response.locals.year,
		projects,
	})
}

exports.projectForm = async (request, response) => {
	const projects = await Projects.findAll()
	response.render('newProject', {
		pageName: 'New Project',
		projects,
	})
}

exports.newProject = async (request, response) => {
	const projects = await Projects.findAll()
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
		const project = await Projects.create({ name })
		response.redirect('/')
	}
}

exports.projectByUrl = async (request, response) => {
	const projectsPromise = Projects.findAll()
	const projectPromise = Projects.findOne({
		where: {
			url: request.params.url,
		},
	})

	const [projects, project] = await Promise.all([
		projectsPromise,
		projectPromise,
	])

	if (!project) return next()

	response.render('tasks', {
		pageName: 'Tasks project',
		project,
		projects,
	})
}

exports.projectEdit = async (request, response) => {
	const projectsPromise = Projects.findAll()

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
