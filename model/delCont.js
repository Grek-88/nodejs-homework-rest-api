const fs = require('fs/promises')
const path = require('path')
const findContactById = require('./findContactById')
const getAll = require('./getAll')

const contactsPath = path.join(__dirname, './contacts.json')

async function delCont(contactId) {
  const contacts = await getAll()

  const delContact = await findContactById(contactId)

  const newContacts = contacts.filter(
    (el) => el.id !== contactId && el.id !== Number(contactId)
  )

  const newContatcsString = JSON.stringify(newContacts)
  await fs.writeFile(contactsPath, newContatcsString)

  return delContact
}

module.exports = delCont
