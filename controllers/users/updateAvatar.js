const { User } = require('../../model/users/userSchema')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

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

module.exports = updateAvatar
