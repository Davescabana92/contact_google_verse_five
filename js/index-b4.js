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
const contacts = [];
let tempContactIndex = null;

// Callback functions
const handleAddStyle = (element, style) => {
  element.classList.add(style);
};

const handleRemoveStyle = (element, style) => {
  element.classList.remove(style);
};

const hideElement = (element) => {
  handleRemoveStyle(element, "display-visible");
  handleAddStyle(element, "display-none");
};

const displayElement = (element) => {
  handleRemoveStyle(element, "display-none");
  handleAddStyle(element, "display-visible");
};

const createDeleteButton = () => {
  const buttonDeleteTaskItem = document.createElement("button");
  const buttonDeleteText = document.createTextNode("Supprimer");
  buttonDeleteTaskItem.appendChild(buttonDeleteText);
  buttonDeleteTaskItem.addEventListener("click", (event) => {
    event.preventDefault();
    event.target.parentElement.remove();
  });
  return buttonDeleteTaskItem;
};

const goBackToContactList = () => {
  hideElement(contactFormContainer);
  displayElement(contactListContainer);
  if (contacts.length > 0) {
    hideElement(emptyContactList);
    displayElement(contactList);
  } else {
    hideElement(contactList);
    displayElement(emptyContactList);
  }
};

const createContactRow = (contact, contactId) => {
  const contactBadge = contact.contactName[0].toUpperCase();
  return `
  <td class="padding-top-bottom-1rem">
                    <div class="flex items-center gap-1rem">
                      <p class="text-badge">${contactBadge}</p>
                      <p>${contact.contactName} ${contact.contactFirstName}</p>
                    </div>
                  </td>
                  <td class="padding-top-bottom-1rem">Maria Anders</td>
                  <td class="padding-top-bottom-1rem">Germany</td>
                  <td class="padding-top-bottom-1rem">Maria Anders</td>
                  <td class="padding-top-bottom-1rem">
                    <div class="flex gap-1rem">
                      <button id="${contactId}-update-button" class="btn btn-info addContactButton button-radius-07 flex items-center" type="button">
                        Modifier
                      </button>
                      <button id="${contactId}-delete-button" class="btn btn-danger addContactButton button-radius-07 flex items-center" type="button">
                        Supprimer
                      </button>
                    </div>
                  </td>
  `;
};

const addContactsToContactTable = () => {
  const contactRow = document.createElement("tr");

  contacts.forEach((contact, index) => {
    const contactId = contact.contactName + contact.contactFirstName + index;
    const contactItem = document.getElementById(contactId);
    contactRow.setAttribute("id", contactId);
    contactRow.innerHTML = createContactRow(contact, contactId);
    contactListTable.appendChild(contactRow);

    const deleteContact = document.getElementById(contactId + "-delete-button");
    deleteContact.addEventListener("click", () => {
      contactItem.remove();
      contacts.splice(index, 1);
      if (contacts.length === 0) {
        hideElement(contactList);
        displayElement(emptyContactList);
      }
      console.log("contacts", contacts);
    });

    const updateContact = document.getElementById(contactId + "-update-button");
    updateContact.addEventListener("click", () => {
      contactFirstName.value = contact.contactFirstName;
      contactName.value = contact.contactName;
      tempContactIndex = index;
      console.log("tempContactIndex", tempContactIndex);
      hideElement(contactListContainer);
      displayElement(contactFormContainer);
    });
  });
};

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
    tempContactIndex = null;
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
  } else {
    contacts.push(contact);
    addContactsToContactTable();
  }

  contactFirstName.value = "";
  contactName.value = "";
  console.log("contacts : ", contacts);
  goBackToContactList();
});
