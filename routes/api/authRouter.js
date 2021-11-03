const express = require('express')
const router = express.Router()

const { controllerWrapper, validate } = require('../../middlewares')
const cntrl = require('../../model/users')

const { joiUserSchema } = require('../../model/users/userSchema')

// // router.get('/', controllerWrapper(cntrl.listContacts))

// // router.get('/:contactId', controllerWrapper(cntrl.getContactById))

/* */
router.post('/signup', validate(joiUserSchema), controllerWrapper(cntrl.signup))

// router.post('/login', validate(joiUserSchema), controllerWrapper(cntrl.login))
// router.get('/logout', controllerWrapper(cntrl.logout))
/* */

// // router.delete('/:contactId', controllerWrapper(cntrl.removeContact))

// // router.put('/:contactId', controllerWrapper(cntrl.updateContact))

// // router.patch('/:contactId/favorite', controllerWrapper(cntrl.updateStatusContact))

module.exports = router
