const express = require('express')
const router = express.Router()

const { controllerWrapper, validate } = require('../../middlewares')
const cntrl = require('../../model/users')

const { joiUserSchema } = require('../../model/users/userSchema')

router.post('/signup', validate(joiUserSchema), controllerWrapper(cntrl.signup))

router.post('/login', validate(joiUserSchema), controllerWrapper(cntrl.login))

// router.get('/logout', controllerWrapper(cntrl.logout))

module.exports = router
