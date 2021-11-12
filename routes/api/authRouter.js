const express = require('express')
const router = express.Router()

const { controllerWrapper, validate, authenticated, upload } = require('../../middlewares')
const cntrl = require('../../model/users')

const { joiUserSchema } = require('../../model/users/userSchema')

router.post('/signup', validate(joiUserSchema), controllerWrapper(cntrl.signup))

router.post('/login', validate(joiUserSchema), controllerWrapper(cntrl.login))

router.get('/logout', controllerWrapper(authenticated), controllerWrapper(cntrl.logout))

router.get('/current', controllerWrapper(authenticated), controllerWrapper(cntrl.current))

router.patch('/avatars', controllerWrapper(authenticated), upload.single('image'), controllerWrapper(cntrl.updateAvatar))

module.exports = router
