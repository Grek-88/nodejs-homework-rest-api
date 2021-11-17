const { User } = require('../../model/users/userSchema')

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null })

  res.status(204).send('No Content')
}

module.exports = logout
