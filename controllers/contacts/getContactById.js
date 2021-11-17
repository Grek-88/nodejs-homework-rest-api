const { Contact } = require('../../model/contacts/contactSchema')
const { NotFound } = require('http-errors')

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

module.exports = getContactById
