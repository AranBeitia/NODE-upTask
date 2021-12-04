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

exports.newProject = (request, response) => {
	// response.send('enviaste el formulario')
	// console.log(request.body) / { nombre: 'valor' }

	// validar que tengamos algo en el input
	const { nombre } = request.body

	let errors = []

	if (!nombre) {
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
	}
}
