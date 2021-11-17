const { User } = require('../../model/users/userSchema')

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

module.exports = current
