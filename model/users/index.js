const { User } = require('./userSchema')
const bcrypt = require('bcryptjs')
const { Conflict, BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) { throw new Conflict('Email in use') }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const defaultAvatar = gravatar.url(email, { protocol: 'http' })

  const result = await User.create({ email, password: hashPassword, avatarURL: defaultAvatar })

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

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file

  const newNameAvatar = `${req.user._id.toString()}.${originalname}`
  const uploadPath = path.join(avatarsDir, newNameAvatar)

  try {
    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)

    await fs.rename(tempPath, uploadPath)

    const avatarURL = `/avatars/${newNameAvatar}`
    await User.findByIdAndUpdate(req.user._id, { avatarURL })

    res.send({
      status: 'Success',
      data: {
        result: avatarURL
      }
    })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar
}
