const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const util = require('util')
const emailConfig = require('../config/email')

let transport = nodemailer.createTransport({
	host: emailConfig.host,
	port: emailConfig.port,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.pass,
	},
})

// generar HTML
const generateHTML = (archive, options = {}) => {
	const html = pug.renderFile(
		`${__dirname}/../views/emails/${archive}.pug`,
		options
	)
	return juice(html)
}

exports.send = async (options) => {
	const html = generateHTML(options.archive, options)
	const text = htmlToText(html)

	let mailOptions = {
		from: '"UpTask" <no-replay@uptask.com>',
		to: options.user.email,
		subject: options.subject,
		text: text,
		html: html,
	}

	const sendEmail = util.promisify(transport.sendMail, transport)
	return sendEmail.call(transport, mailOptions)
}
