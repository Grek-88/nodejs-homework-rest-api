const signup = require('./singup')
const verify = require('./verify')
const resendEmailVerify = require('./resendEmailVerify')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateAvatar = require('./updateAvatar')

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verify,
  resendEmailVerify
}
