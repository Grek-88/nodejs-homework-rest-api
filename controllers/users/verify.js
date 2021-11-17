const { User } = require('../../model/users/userSchema')
const { NotFound } = require('http-errors')

const verify = async (req, res) => {
  const { verifyToken } = req.params

  const user = await User.findOne({ verifyToken })
  if (!user) { throw new NotFound('User not found') }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })

  res.format({
    json: function () {
      res.send({ message: 'Verification successful' })
    },
    html: function () {
      res.send('<h2>Verification successful</h2>')
    }
  })
}

module.exports = verify
