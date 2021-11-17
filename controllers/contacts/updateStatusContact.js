const { Contact } = require('../../model/contacts/contactSchema')
const { NotFound, BadRequest } = require('http-errors')

const updateStatusContact = async (req, res, next) => {
  if (!req.body || req.body.favorite === undefined) { throw new BadRequest('missing field favorite') }

  const { contactId } = req.params
  const { favorite } = req.body

  const updateContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!updateContact) { throw new NotFound(`Contact with id=${contactId} not found`) }

  res.send(updateContact)
  return updateContact
}

module.exports = updateStatusContact
