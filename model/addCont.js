const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')
const { v4 } = require('uuid')
const getAll = require('./getAll')

async function addCont({ name, email, phone }) {
  // eslint-disable-next-line no-useless-catch
  try {
    const newContact = { name, email, phone, id: v4() }

    const contacts = await getAll()
    const newContacts = [...contacts, newContact]

    const newContatcsString = JSON.stringify(newContacts)

    await fs.writeFile(contactsPath, newContatcsString)
    return newContact
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = addCont
