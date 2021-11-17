const { User } = require('../../model/users/userSchema')
const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { v4 } = require('uuid')
const { sendMail } = require('../../utils')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) { throw new Conflict('Email in use') }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const defaultAvatar = gravatar.url(email, { protocol: 'http' })

  const resultUser = await User.create({ email, password: hashPassword, avatarURL: defaultAvatar, verifyToken: v4() })

  const { verifyToken } = resultUser
  const emailMessage = {
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<a href="http://localhost:3000/api/v1/users/verify/${verifyToken}">Подтвердите регистрацию</a>`
  }

  await sendMail(emailMessage)

  res.status(201).send({
    status: 'Success',
    user: resultUser
  })
}

module.exports = signup
