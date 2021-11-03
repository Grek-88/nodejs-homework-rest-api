const { Contact } = require('./contactSchema')

const listContacts = async (req, res, next) => {
  const contactsData = await Contact.find({})

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

  if (!selectContact) {
    const error = new Error(`Contact with id=${contactId} not found`)
    error.status = 404
    throw error
  }

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
  if (!deleteContact) {
    const error = new Error(`Contact with id=${contactId} not found`)
    error.status = 404
    throw error
  }

  res.send({ message: 'contact deleted' })

  return deleteContact
}

const addContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body)

  res.status(201).send(newContact)
  return newContact
}

const updateContact = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: 'missing fields' })
  }

  const { contactId } = req.params

  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!updateContact) {
    const error = new Error(`Contact with id=${contactId} not found`)
    error.status = 404
    throw error
  }

  res.send(updateContact)
  return updateContact
}

const updateStatusContact = async (req, res, next) => {
  if (!req.body || req.body.favorite === undefined) {
    return res.status(400).send({ message: 'missing field favorite' })
  }

  const { contactId } = req.params
  const { favorite } = req.body

  const updateContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!updateContact) {
    const error = new Error(`Contact with id=${contactId} not found`)
    error.status = 404
    throw error
  }

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
