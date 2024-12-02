// Selects all elements
const burgerMenu = document.querySelector("#burger-menu");
const sideBarMenu = document.querySelector("#side-bar");
const mainSection = document.querySelector("#main-section");
//
const addContactButtonList = document.querySelectorAll(".addContactButton");
const arrowBack = document.getElementById("arrowBack");
//
const contactListContainer = document.getElementById("contactListContainer");
const emptyContactList = document.getElementById("emptyContactList");
const contactList = document.getElementById("contactList");
const contactListTable = document.getElementById("contactListTable");
//
const contactFormContainer = document.getElementById("contactFormContainer");
const contactFirstName = document.getElementById("contactFirstName");
const contactName = document.getElementById("contactName");
const saveContact = document.getElementById("saveContact");
let contacts = [];
let tempContactIndex = null;

// Callback functions

function handleAddStyle(element, style) {
  element.classList.add(style);
}

function handleRemoveStyle(element, style) {
  element.classList.remove(style);
}

function hideElement(element) {
  handleRemoveStyle(element, "display-visible");
  handleAddStyle(element, "display-none");
}

function displayElement(element) {
  handleRemoveStyle(element, "display-none");
  handleAddStyle(element, "display-visible");
}

function createDeleteButton() {
  const buttonDeleteTaskItem = document.createElement("button");
  const buttonDeleteText = document.createTextNode("Supprimer");
  buttonDeleteTaskItem.appendChild(buttonDeleteText);
  buttonDeleteTaskItem.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
  });
  return buttonDeleteTaskItem;
}

function goBackToContactList() {
  hideElement(contactFormContainer);
  displayElement(contactListContainer);
  if (contacts.length > 0) {
    hideElement(emptyContactList);
    displayElement(contactList);
    // console.log(contacts);
  } else {
    hideElement(contactList);
    displayElement(emptyContactList);
    // console.log(contacts);
  }
}

function createContactRow(contact, contactId) {
  const contactBadge = contact.contactFirstName[0].toUpperCase();
  return `
                  <td class="padding-top-bottom-1rem">
                    <div class="flex items-center gap-1rem">
                      <p class="text-badge">${contactBadge}</p>
                      <p>${contact.contactFirstName} ${contact.contactName}</p>
                    </div>
                  </td>
                  <td class="padding-top-bottom-1rem">Maria Anders</td>
                  <td class="padding-top-bottom-1rem">Germany</td>
                  <td class="padding-top-bottom-1rem">Maria Anders</td>
                  <td class="padding-top-bottom-1rem">
                    <div class="flex gap-1rem">
                      <button id="${contactId}-update-btn" class="btn btn-info addContactButton button-radius-07 flex items-center" type="button">
                        Modifier
                      </button>
                      <button id="${contactId}-delete-btn" class="btn btn-danger addContactButton button-radius-07 flex items-center" type="button">
                        Supprimer
                      </button>
                    </div>
                  </td>
    `;
}

function addDeleteEventToContactDeleteButton(
  contactId,
  contact,
  contactItemTable
) {
  const deleteContactButton = document.getElementById(
    contactId + "-delete-btn"
  );
  deleteContactButton.addEventListener("click", () => {
    contacts = contacts.filter((contactFilter) => {
      return contactFilter !== contact;
    });
    contactItemTable.remove();
    goBackToContactList();
    console.log(contacts);
  });
}

function addUpdateEventToContactUpdateButton(
  contactId,
  contact,
  index,
  contactItemTable
) {
  const updateContactButton = document.getElementById(
    contactId + "-update-btn"
  );
  updateContactButton.addEventListener("click", () => {
    contactFirstName.value = contact.contactFirstName;
    contactName.value = contact.contactName;
    tempContactIndex = index;
    contactItemTable.remove();
    hideElement(contactListContainer);
    displayElement(contactFormContainer);
    console.log(contacts);
  });
}

function addContactsToContactTable() {
  //
  const contactRow = document.createElement("tr");

  contacts.forEach((contact, index) => {
    const contactId = contact.contactFirstName + contact.contactName + index;
    contactRow.setAttribute("id", contactId);
    //
    contactRow.innerHTML = createContactRow(contact, contactId);
    contactListTable.appendChild(contactRow);
    //
    const contactItem = document.getElementById(contactId);

    //
    addDeleteEventToContactDeleteButton(contactId, contact, contactItem);

    //
    addUpdateEventToContactUpdateButton(contactId, contact, index, contactItem);
  });
}

// Add events

burgerMenu.addEventListener("click", (event) => {
  if (sideBarMenu.classList.contains("display-none")) {
    handleRemoveStyle(sideBarMenu, "display-none");
    handleRemoveStyle(mainSection, "w-100");
  } else {
    handleAddStyle(sideBarMenu, "display-none");
    handleAddStyle(mainSection, "w-100");
  }
});

addContactButtonList.forEach((addContactButton) => {
  addContactButton.addEventListener("click", () => {
    hideElement(contactListContainer);
    displayElement(contactFormContainer);
  });
});

arrowBack.addEventListener("click", () => {
  goBackToContactList();
});

saveContact.addEventListener("click", (event) => {
  event.preventDefault();
  const contact = {
    contactFirstName: contactFirstName.value,
    contactName: contactName.value,
  };
  if (tempContactIndex !== null) {
    contacts[tempContactIndex] = contact;
    addContactsToContactTable();
    // invocation de la fonction de mis à jour de l'interface
  } else {
    contacts.push(contact);
    addContactsToContactTable();
  }
  contactFirstName.value = "";
  contactName.value = "";

  goBackToContactList();
});
