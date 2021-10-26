const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

async function getAll() {
  const data = await fs.readFile(contactsPath)

  const contacts = JSON.parse(data)

  return contacts
}

module.exports = getAll
