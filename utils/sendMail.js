const nodemailer = require('nodemailer')
const { BadRequest } = require('http-errors')

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'goit-test@mail.ru',
    pass: EMAIL_PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async(data) => {
  try {
    const emailMessage = { ...data, from: 'goit-test@mail.ru' }
    await transporter.sendMail(emailMessage)
  } catch (error) {
    throw new BadRequest(error.message)
  }
}

module.exports = sendMail
