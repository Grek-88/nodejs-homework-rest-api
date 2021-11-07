const { Contact } = require('./contactSchema')
const { NotFound, BadRequest } = require('http-errors')

const listContacts = async (req, res, next) => {
  const contactsData = await Contact.find({ owner: req.user._id }).populate('owner', '_id email')

  res.send({
    status: 'success',
    code: 200,
    result: contactsData
  })
  return contactsData
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params

  const selectContact = await Contact.findById(contactId)

  if (!selectContact) { throw new NotFound(`Contact with id=${contactId} not found`) }

  res.send({
    status: 'success',
    code: 200,
    result: selectContact
  })
  return selectContact
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const deleteContact = await Contact.findByIdAndDelete(contactId)
  if (!deleteContact) { throw new NotFound(`Contact with id=${contactId} not found`) }

  res.send({ message: 'contact deleted' })

  return deleteContact
}

const addContact = async (req, res, next) => {
  const request = { ...req.body, owner: req.user._id }
  const newContact = await Contact.create(request)

  res.status(201).send(newContact)
  return newContact
}

const updateContact = async (req, res, next) => {
  if (!req.body) { throw new BadRequest('missing fields') }

  const { contactId } = req.params

  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!updateContact) { throw new NotFound(`Contact with id=${contactId} not found`) }

  res.send(updateContact)
  return updateContact
}

const updateStatusContact = async (req, res, next) => {
  if (!req.body || req.body.favorite === undefined) { throw new BadRequest('missing field favorite') }

  const { contactId } = req.params
  const { favorite } = req.body

  const updateContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!updateContact) { throw new NotFound(`Contact with id=${contactId} not found`) }

  res.send(updateContact)
  return updateContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
