const { Contact } = require('../../model/contacts/contactSchema')

const listContacts = async (req, res, next) => {
  const contactsData = await Contact.find({ owner: req.user._id }).populate('owner', '_id email')

  res.send({
    status: 'success',
    code: 200,
    result: contactsData
  })
  return contactsData
}

module.exports = listContacts
