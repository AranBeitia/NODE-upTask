const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const { expressValidator } = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')
// importar variables
require('dotenv').config({ path: 'variables.env' })

/** helpers con algunas funciones */
const helpers = require('./helpers')

/** crear conexion a la base de datos */
const db = require('./config/db')

/** importar el modelo */
require('./models/Projects')
require('./models/Tasks')
require('./models/Users')

db.sync()
	.then(() => console.log('exito, conexion al servidor'))
	.catch((error) => console.log(error))

/** crear una app de express */
const app = express()

/** habilitar bodyParser para leer datos del formulario */
app.use(bodyParser.urlencoded({ extended: true }))

/** donde cargar los archivos estaticos */
app.use(express.static('public'))

/** habilitar pug */
app.set('view engine', 'pug')

/** habilitar bodyParser para leer datos del formulario */
app.use(bodyParser.urlencoded({ extended: true }))

/** añadir express validator a toda la aplicacion */
// app.use(expressValidator())

/** añadir carpeta de las vistas */
app.set('views', path.join(__dirname, './views'))

/** añadir flash nessages */
app.use(flash())

app.use(cookieParser())
//** navegacion sin perdida de sesion */
app.use(
	session({
		secret: 'supersecreto',
		resave: false,
		saveUninitialized: false,
	})
)

app.use(passport.initialize())
app.use(passport.session())

/** pasar vardump a la aplicacion */
/** middleware 1 */
app.use((request, response, next) => {
	response.locals.vardump = helpers.vardump
	response.locals.messages = request.flash()
	response.locals.user = { ...request.user } || null
	next()
})
/** middleware 2 */
app.use((request, response, next) => {
	response.locals.year = new Date().getFullYear()
	next()
})

app.use('/', routes())

// servidor y puerto
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.listen(port, host, () => {
	console.log('server is connected')
})
// app.listen(3000)

// require('./handlers/email') --> ejecuta el envio de email al npm start
