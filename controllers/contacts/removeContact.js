const { Contact } = require('../../model/contacts/contactSchema')
const { NotFound } = require('http-errors')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const deleteContact = await Contact.findByIdAndDelete(contactId)
  if (!deleteContact) { throw new NotFound(`Contact with id=${contactId} not found`) }

  res.send({ message: 'contact deleted' })

  return deleteContact
}

module.exports = removeContact
