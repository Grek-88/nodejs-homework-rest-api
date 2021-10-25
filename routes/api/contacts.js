const express = require('express')
const router = express.Router()

const cntrl = require('../../model')

router.get('/', cntrl.listContacts)

router.get('/:contactId', cntrl.getContactById)

router.post('/', cntrl.addContact)

router.delete('/:contactId', cntrl.removeContact)

router.put('/:contactId', cntrl.updateContact)

module.exports = router
