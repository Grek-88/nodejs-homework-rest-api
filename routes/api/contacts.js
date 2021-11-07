const express = require('express')
const router = express.Router()

const { controllerWrapper, validate, authenticated } = require('../../middlewares')
const cntrl = require('../../model/contacts')

const { joiContactSchema } = require('../../model/contacts/contactSchema')

router.get('/', controllerWrapper(authenticated), controllerWrapper(cntrl.listContacts))

router.get('/:contactId', controllerWrapper(authenticated), controllerWrapper(cntrl.getContactById))

router.post('/', validate(joiContactSchema), controllerWrapper(authenticated), controllerWrapper(cntrl.addContact))

router.delete('/:contactId', controllerWrapper(authenticated), controllerWrapper(cntrl.removeContact))

router.put('/:contactId', controllerWrapper(authenticated), controllerWrapper(cntrl.updateContact))

router.patch('/:contactId/favorite', controllerWrapper(authenticated), controllerWrapper(cntrl.updateStatusContact))

module.exports = router
