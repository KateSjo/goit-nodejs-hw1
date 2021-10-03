const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  const result = JSON.parse(contacts);

  return result;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const [result] = contacts.filter(contact => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);

  if (contacts.includes(contact)) {
    const contactIndex = contacts.indexOf(contact);
    contacts.splice(contactIndex, 1);
  } else {
    return;
  }

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};