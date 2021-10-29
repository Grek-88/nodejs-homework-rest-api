const express = require('express')
const router = express.Router()

const { controllerWrapper, contactsValidate } = require('../../middlewares')
const cntrl = require('../../model')

const { joiSchema } = require('../../model/contactSchema')

router.get('/', controllerWrapper(cntrl.listContacts))

router.get('/:contactId', controllerWrapper(cntrl.getContactById))

router.post('/', contactsValidate(joiSchema), controllerWrapper(cntrl.addContact))

router.delete('/:contactId', controllerWrapper(cntrl.removeContact))

router.put('/:contactId', controllerWrapper(cntrl.updateContact))

router.patch('/:contactId/favorite', controllerWrapper(cntrl.updateStatusContact))

module.exports = router
