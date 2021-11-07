const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../model/users/userSchema')

const authenticated = async(req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') { throw new Unauthorized() }

    const { SECRET_KEY } = process.env
    jwt.verify(token, SECRET_KEY)

    const user = await User.findOne({ token })
    if (!user) { throw new Unauthorized() }

    req.user = user
    next()
  } catch (error) { throw new Unauthorized() }
}

module.exports = authenticated
