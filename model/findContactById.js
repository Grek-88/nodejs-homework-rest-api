const getAll = require('./getAll')

async function findContactById(contactId) {
  const contacts = await getAll()
  const selectContact = contacts.find(
    (el) => el.id === contactId || el.id === Number(contactId)
  )

  if (!selectContact) {
    throw new Error(`Contact with id=${contactId} not found`)
  }

  return selectContact
}

module.exports = findContactById
