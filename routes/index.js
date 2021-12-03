const express = require('express')
const router = express.Router()

module.exports = function () {
	/* rutas */
	router.get('/', (request, response) => {
		response.send('Index')
	})

	router.get('/nosotros', (request, response) => {
		response.send('Nosotros')
	})

	return router
}
