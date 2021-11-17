const { User } = require('../../model/users/userSchema')
const bcrypt = require('bcryptjs')
const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) { throw new BadRequest('Email or password is wrong') }
  if (!user.verify) { throw new BadRequest('Email не подтвержден') }

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

module.exports = login
