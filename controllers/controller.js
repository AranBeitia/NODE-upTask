exports.home = (request, response) => {
	response.render('index')
}

exports.nosotros = (request, response) => {
	response.send('Nosotros')
}
