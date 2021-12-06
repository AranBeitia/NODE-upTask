const { noExtendRight } = require('sequelize/dist/lib/operators')
const Projects = require('../models/Projects')
const Tasks = require('../models/Tasks')

exports.addTask = async (request, response, next) => {
	/** obtener proyecto actual */
	const project = await Projects.findOne({ where: { url: request.params.url } })

	/** leer valor del input */
	const { task } = request.body

	/** estado 0 = incompleto */
	const state = 0
	const projectId = project.id

	/** insertar en base de datos */
	const result = await Tasks.create({ task, state, projectId })
	if (!result) next()

	response.redirect(`/projects/${request.params.url}`)
}

exports.changeStateTask = async (request, response) => {
	const { id } = request.params
	const task = await Tasks.findOne({ where: { id } })

	/** cambiar estado */
	let state = 0
	if (task.state === state) {
		state = 1
	}
	task.state = state

	const result = await task.save()
	if (!result) next()

	response.status(200).send('Updated')
}
