const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

async function getAll() {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await fs.readFile(contactsPath)

    const contacts = JSON.parse(data)

    return contacts
  } catch (error) {
    console.log(error)
  }
};

module.exports = getAll
