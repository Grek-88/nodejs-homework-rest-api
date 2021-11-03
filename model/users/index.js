const { User } = require('./userSchema')
const bcrypt = require('bcryptjs')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(409).send({ message: 'Email in use' })
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const result = await User.create({ email, password: hashPassword })

  res.status(201).send({
    status: 'Success',
    user: result
  })
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) { return res.status(401).send({ message: 'Email or password is wrong' }) }

  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)
  if (!compareResult) { return res.status(401).send({ message: 'Email or password is wrong' }) }

  const token = 'qweqwe.qweqwe.qweqwe'

  res.send({
    status: 'Success',
    token,
    user
  })
}

module.exports = {
  signup,
  login
}
