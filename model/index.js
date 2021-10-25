/* eslint-disable no-useless-catch */
/* eslint-disable semi */
const fs = require('fs/promises');

const path = require('path');
const contacts = path.join(__dirname, './contacts.json');
const getAll = require('./getAll');
const findContactById = require('./findContactById');
const addCont = require('./addCont');
const updateCont = require('./updateCont');

const listContacts = async (req, res) => {
  try {

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

    if (!selectContact) {
      res.status(404).send({ message: 'Not found' });
    }

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

    const newContacts = contactsData.filter(
      (el) => el.id !== contactId && el.id !== Number(contactId)
    );

    await fs.writeFile(contacts, JSON.stringify(newContacts));
    res.send({ message: 'contact deleted' });

    const delContact = await findContactById(contactId);
    return delContact;
  } catch (error) {
    res.status(404).send({ message: 'Not found' });
  }
};

const addContact = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).send({ message: 'missing required name field' })
    };
    const newContact = await addCont(req.body);

    res.send(201, newContact);
    return newContact;
  } catch (error) {
    res.status(404).send({ message: 'Not found' });
  }
};

const updateContact = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: 'missing fields' })
    }
    const { contactId } = req.params;
    const updateContact = await updateCont(contactId, req.body);

    res.send(updateContact);
    return updateContact;
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
