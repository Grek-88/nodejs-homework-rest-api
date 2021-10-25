/* eslint-disable no-useless-catch */
/* eslint-disable semi */
const fs = require('fs/promises');
const { v4 } = require('uuid');

const path = require('path');
const contacts = path.join(__dirname, './contacts.json');
const getAll = require('./getAll');
const findContactById = require('./findContactById');

const listContacts = async (req, res) => {
  try {
    // const data = await fs.readFile(contacts);
    // const contactsData = JSON.parse(data);

    const contactsData = await getAll();

    res.send({
      status: 'success',
      code: 200,
      result: contactsData
    })
    return contactsData;
  } catch (error) {
    res.status(404).send({ message: 'Not found' });
  }
};

const getContactById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const selectContact = await findContactById(contactId);

    // const contactsData = await listContacts();
    // const selectContact = contactsData.find(
    //   (el) => el.id === contactId || el.id === Number(contactId)
    // );

    // if (!selectContact) {
    //   res.status(404).send({ message: 'Not found' });
    // }

    res.send({
      status: 'success',
      code: 200,
      result: selectContact
    })
    return selectContact;
  } catch (error) {
    res.status(404).send({ message: 'Not found' });
  }
};

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contactsData = await getAll();

    const delContact = await findContactById(contactId);

    const newContacts = contactsData.filter(
      (el) => el.id !== contactId && el.id !== Number(contactId)
    );

    const newContatcsString = JSON.stringify(newContacts);
    await fs.writeFile(contacts, newContatcsString);

    res.send({ message: 'contact deleted' });
    return delContact;
  } catch (error) {
    res.status(404).send({ message: 'Not found' });
  }
};

const addContact = async (req, res, body) => {
  try {
    const newContact = { name: body.name, email: body.email, phone: body.phone, id: v4() };

    const contactsData = await listContacts();
    const newContacts = [...contactsData, newContact];

    const newContatcsString = JSON.stringify(newContacts);

    await fs.writeFile(contacts, newContatcsString);
    return newContact;
  } catch (error) {
    res.status(404).send({ message: 'Not found' });
  }
};

const updateContact = async (contactId, body, res) => {
  try {
    const contactsData = await listContacts();
    let selectContact = contactsData.find(
      (el) => el.id === contactId || el.id === Number(contactId)
    );

    // if (!selectContact || !body) {
    // const errorMess = !selectContact ? `Contact with id = ${contactId} not found` : 'Body for contact not found';
    // throw new Error(errorMess);
    // };

    selectContact = { ...selectContact, ...body };

    const newContatcsString = JSON.stringify(contactsData);

    await fs.writeFile(contacts, newContatcsString);

    return selectContact;
  } catch (error) {
    res.status(404).send({ message: 'Not found' });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
