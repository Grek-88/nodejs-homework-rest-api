const { User } = require('./userSchema')
const bcrypt = require('bcryptjs')
const { Conflict, BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) { throw new Conflict('Email in use') }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const defaultAvatar = gravatar.url(email)

  const result = await User.create({ email, password: hashPassword, avatarURL: `http:${defaultAvatar}` })

  res.status(201).send({
    status: 'Success',
    user: result
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) { throw new BadRequest('Email or password is wrong') }

  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)
  if (!compareResult) { throw new BadRequest('Email or password is wrong') }

  const payload = {
    id: user._id
  }
  const { SECRET_KEY } = process.env
  const token = jwt.sign(payload, SECRET_KEY)

  await User.findByIdAndUpdate(user._id, { token })

  res.send({
    status: 'Success',
    token
  })
}

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null })

  res.status(204).send('No Content')
}

const current = async (req, res) => {
  const user = await User.findById(req.user._id)

  res.send({
    status: 'Success',
    user: {
      email: `${user.email}`,
      subscription: `${user.subscription}`
    }
  })
}

module.exports = {
  signup,
  login,
  logout,
  current
}
