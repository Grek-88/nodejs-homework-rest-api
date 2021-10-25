const fs = require('fs/promises')
const path = require('path')
const getAll = require('./getAll')

const contactsPath = path.join(__dirname, './contacts.json')

async function updateCont(contactId, body) {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await getAll()
    const index = contacts.findIndex((el) => el.id === contactId || el.id === Number(contactId))

    if (index === -1) {
      throw new Error(`Contact with id=${contactId} not found`)
    }
    contacts[index] = { ...contacts[index], ...body }

    const newContatcsString = JSON.stringify(contacts)

    await fs.writeFile(contactsPath, newContatcsString)

    return contacts[index]
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = updateCont
