const express = require('express')
const router = express.Router()

const controllerWrapper = require('../../middlewares/controllerWrapper')
const cntrl = require('../../model')

router.get('/', controllerWrapper(cntrl.listContacts))

router.get('/:contactId', controllerWrapper(cntrl.getContactById))

router.post('/', controllerWrapper(cntrl.addContact))

router.delete('/:contactId', controllerWrapper(cntrl.removeContact))

router.put('/:contactId', controllerWrapper(cntrl.updateContact))

module.exports = router
