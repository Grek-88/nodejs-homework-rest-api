const getAll = require('./getAll')

async function findContactById(contactId) {
  try {
    const contacts = await getAll()
    const selectContact = contacts.find(
      (el) => el.id === contactId || el.id === Number(contactId)
    )

    if (!selectContact) {
      return new Error(`Contact with id=${contactId} not found`)
    }

    return selectContact
  } catch (error) {
    return error
  }
}

module.exports = findContactById
