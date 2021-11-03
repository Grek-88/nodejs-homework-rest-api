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

module.exports = {
  signup
}
