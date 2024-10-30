function getContact() {
  const contacts = localStorage.getItem("contacts");
  return contacts ? JSON.parse(contacts) : [];
}

function saveContact(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContact() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = '';
  const contacts = getContact();
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span id="contact-${index}">
        ${contact.firstName}, ${contact.lastName}, ${contact.phone}, ${contact.email}
      </span>
      <button type="submit" onclick="editContact(${index})">Edit Contact</button>
      <button type="submit" onclick="deleteContact(${index})">Delete Contact</button>
    `;
    contactList.appendChild(li);
  });
}

function saveContacts(event) {
  event.preventDefault();
  const inputFirstName = document.querySelector("#firstName").value;
  const inputLastName = document.querySelector("#lastName").value;
  const inputPhone = document.querySelector("#phone").value;
  const inputEmail = document.querySelector("#email").value;

  const newContact = {
    firstName: inputFirstName,
    lastName: inputLastName,
    phone: inputPhone,
    email: inputEmail,
  };

  const contacts = getContact();
  contacts.push(newContact);
  saveContact(contacts);
  renderContact();
}

function editContact(index) {
  const contacts = getContact();
  const contact = contacts[index];
  const getElementContact = document.getElementById(`contact-${index}`);
  getElementContact.innerHTML = `
    <input type="text" id="updateFirstName-${index}" value="${contact.firstName}">
    <input type="text" id="updateLastName-${index}" value="${contact.lastName}">
    <input type="text" id="updatePhone-${index}" value="${contact.phone}">
    <input type="text" id="updateEmail-${index}" value="${contact.email}">
    <button type="submit" onclick="saveUpdateContact(${index})">Save Contact</button>
  `;
}

function saveUpdateContact(index) {
  const contacts = getContact();
  const updatedContact = {
    firstName: document.getElementById(`updateFirstName-${index}`).value,
    lastName: document.getElementById(`updateLastName-${index}`).value,
    phone: document.getElementById(`updatePhone-${index}`).value,
    email: document.getElementById(`updateEmail-${index}`).value,
  };
  contacts[index] = updatedContact;
  saveContact(contacts);
  renderContact();
}

function deleteContact(index) {
  const contacts = getContact();
  contacts.splice(index, 1);
  saveContact(contacts);
  renderContact();
}

document.getElementById("contactForm").addEventListener("submit", saveContacts);