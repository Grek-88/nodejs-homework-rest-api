const { Contact } = require('../../model/contacts/contactSchema')

const addContact = async (req, res, next) => {
  const request = { ...req.body, owner: req.user._id }
  const newContact = await Contact.create(request)

  res.status(201).send(newContact)
  return newContact
}

module.exports = addContact
