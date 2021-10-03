const chalk = require("chalk");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contacts = await listContacts();
        if (contacts.length <= 0) {
          return console.log(chalk.red("SORRY, THERE ARE NO CONTACTS"));
        }
        console.log(chalk.blue("HERE ARE YOUR CONTACTS"));
        return console.table(contacts);
      } catch (error) {
        console.log(`SORRY, WE HAVE AN ERROR: ${error.message}`);
      }
      break;

    case "get":
      try {
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.blue("THIS IS YOUR CONTACT"));
          console.table(contactById);
          return;
        }
        console.log(chalk.red("THERE IS NO CONTACTS WITH THIS ID"));
        return;
      } catch (err) {
        console.log(`SORRY, WE HAVE AN ERROR: ${error.message}`);
      }
      break;

    case "add":
      try {
        const contacts = await addContact(name, email, phone);
        console.log(chalk.blue(`YOU HAVE ADDED A NEW CONTACT ${name}`));
        console.table(contacts);
      } catch (error) {
        console.log(`SORRY, WE HAVE AN ERROR: ${error.message}`);
      }
      break;

    case "remove":
      try {
        const contactFiltered = await removeContact(id);
        if (contactFiltered) {
          console.log(chalk.blue("ITS YOUR FILTERED CONTACTS"));
          console.log(chalk.blue(`YOU REMOVED A CONTACT WITH ID = ${id}`));
          console.table(contactFiltered);
          return;
        }
        console.log(chalk.red("THERE IS NO CONTACTS WITH THIS ID"));
        return;
      } catch (err) {
        console.log(`SORRY, WE HAVE AN ERROR: ${error.message}`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);