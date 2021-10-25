const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

async function getAll() {
  try {
    const data = await fs.readFile(contactsPath)

    const contacts = JSON.parse(data)

    return contacts
  } catch (error) {
    throw new Error(error)
  }
};

module.exports = getAll
