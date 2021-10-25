const express = require('express')
const router = express.Router()

const cntrl = require('../../model')
// console.log('ctrl', ctrl)

router.get('/', cntrl.listContacts)
// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message1' })
// })

router.get('/:contactId', cntrl.getContactById)
// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', cntrl.removeContact)

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
