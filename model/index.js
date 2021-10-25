const schema = require('../schemaValidate/contactsValidate')

const getAll = require('./getAll')
const findContactById = require('./findContactById')
const addCont = require('./addCont')
const updateCont = require('./updateCont')
const delCont = require('./delCont')

const listContacts = async (req, res, next) => {
  try {
    const contactsData = await getAll()

    res.send({
      status: 'success',
      code: 200,
      result: contactsData
    })
    return contactsData
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const selectContact = await findContactById(contactId)

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
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await delCont(contactId)
    if (!deleteContact) {
      const error = new Error(`Contact with id=${contactId} not found`)
      error.status = 404
      throw error
    }

    res.send({ message: 'contact deleted' })

    return deleteContact
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    };

    const newContact = await addCont(req.body)

    res.status(201).send(newContact)
    return newContact
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: 'missing fields' })
    }
    const { error } = schema.validate(req.body)
    if (error) {
      const err = new Error(error.message)
      err.status = 400
      throw err
    };

    const { contactId } = req.params
    const updateContact = await updateCont(contactId, req.body)
    if (!updateContact) {
      const error = new Error(`Contact with id=${contactId} not found`)
      error.status = 404
      throw error
    }

    res.send(updateContact)
    return updateContact
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
