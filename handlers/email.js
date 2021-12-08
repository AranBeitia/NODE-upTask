const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const emailConfig = require('../config/email')
const email = require('../config/email')

let transport = nodemailer.createTransport({
	host: emailConfig.host,
	port: emailConfig.port,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.pass,
	},
})

// generar HTML
const generateHTML = () => {
	const html = pug.renderFile(
		`${__dirname}/../views/emails/restorePasswordMail.pug`
	)
	return juice(html)
}

let mailOptions = {
	from: '"UpTask" <no-replay@uptask.com>',
	to: 'correo@correo.com',
	subject: 'Reset password',
	text: 'Hello',
	html: generateHTML(),
}

transport.sendMail(mailOptions)
