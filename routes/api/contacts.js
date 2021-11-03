const express = require('express')
const router = express.Router()

const { controllerWrapper, validate } = require('../../middlewares')
const cntrl = require('../../model/contacts')

const { joiContactSchema } = require('../../model/contacts/contactSchema')

router.get('/', controllerWrapper(cntrl.listContacts))

router.get('/:contactId', controllerWrapper(cntrl.getContactById))

router.post('/', validate(joiContactSchema), controllerWrapper(cntrl.addContact))

router.delete('/:contactId', controllerWrapper(cntrl.removeContact))

router.put('/:contactId', controllerWrapper(cntrl.updateContact))

router.patch('/:contactId/favorite', controllerWrapper(cntrl.updateStatusContact))

module.exports = router
