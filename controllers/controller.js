const Projects = require('../models/Projects')

exports.home = (request, response) => {
	response.render('index', {
		pageName: 'Projects',
	})
}

exports.projectForm = (request, response) => {
	response.render('newProject', {
		pageName: 'New Project',
	})
}

exports.newProject = async (request, response) => {
	// response.send('enviaste el formulario')
	// console.log(request.body) / { nombre: 'valor' }

	// validar que tengamos algo en el input
	const { name } = request.body

	let errors = []

	if (!name) {
		errors.push({ texto: 'agregar un nombre al proyecto' })
	}

	// si hay errores
	if (errors.length > 0) {
		response.render('newProject', {
			pageName: 'New Project',
			errors,
		})
	} else {
		// no hay errores
		// insertar en la BD.
		const project = await Projects.create({ name })
		// .then(() => console.log('Insertado exitosamente en la base de datos'))
		// .catch((error) => console.log(error))
		response.redirect('/')
	}
}
