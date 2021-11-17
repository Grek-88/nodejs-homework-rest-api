const { Contact } = require('../../model/contacts/contactSchema')
const { NotFound, BadRequest } = require('http-errors')

const updateContact = async (req, res, next) => {
  if (!req.body) { throw new BadRequest('missing fields') }

  const { contactId } = req.params

  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!updateContact) { throw new NotFound(`Contact with id=${contactId} not found`) }

  res.send(updateContact)
  return updateContact
}

module.exports = updateContact
