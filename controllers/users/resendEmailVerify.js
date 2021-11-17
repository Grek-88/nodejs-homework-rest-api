const { User } = require('../../model/users/userSchema')
const { BadRequest, NotFound } = require('http-errors')
const { sendMail } = require('../../utils')

const resendEmailVerify = async (req, res) => {
  const { email } = req.body

  if (!email) { throw new BadRequest('missing required field email') }

  const user = await User.findOne({ email })
  if (!user) { throw new NotFound('User not found') }
  if (user.verify) { throw new BadRequest('Verification has already been passed') }

  const { verifyToken } = user
  const emailMessage = {
    to: email,
    subject: 'Confirmation of registration',
    html: `<a href="http://localhost:3000/api/v1/users/verify/${verifyToken}">Confirm registration by clicking on the link</a>`
  }

  await sendMail(emailMessage)

  res.send({
    status: 'Success',
    message: 'The letter for confirmation of registration has been sent again'
  })
}

module.exports = resendEmailVerify
