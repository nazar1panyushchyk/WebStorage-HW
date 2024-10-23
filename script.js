function getContact() {
  const contacts = localStorage.getItem("contacts");
  if (contacts) {
    return JSON.parse(contacts);
  } else {
    return [];
  }
}

function saveContact(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContact() {
  console.log("render");

  const contactList = document.getElementById("contactList");
  contactList.innerHTML = '';
  const contacts = getContact();
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <span id="contact-${index}">
    ${contact.firstName}, ${contact.lastName}, ${contact.phoneNumber}, ${contact.email} 
    </span>
    <button type="submit" onclick="editContact(${index})">Edit Contact</button> 
    // <button type="submit" onclick="deleteContact(${index})">Delete Contact</button> 
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
  console.log(inputFirstName, inputLastName, inputEmail, inputPhone);
  const localStorageContacts = {
    firstName: inputFirstName,
    lastName: inputLastName,
    phoneNumber: inputPhone,
    email: inputEmail,
  }
  const contact = getContact();
  contact.push(localStorageContacts);
  saveContact(contact);
  renderContact();
}

function editContact() {
  const contacts = getContact()
  const contact = contacts[index]
  const getElementContact = document.getElementById(`contact-${index}`)
  getElementContact.innerHTML = `
  <input type="text" id="updateFirstName-${index}" value=${contact.firstName}>
  <input type="text" id="updateLastName-${index}" value=${contact.lastName}>
  <input type="text" id="updatePhone-${index}" value=${contact.phoneNumber}>
  <input type="text" id="updateEmail-${index}" value=${contact.email}>
  <button type="submit" onclick="saveUpdateContact(${index})">Save Contact</button> 
  `
}

function saveUpdateContact(index) {
  const contacts = getContact()
  const getUpdateFirstName = document.getElementById(`updateFirstName-${index}`).value;
  const getUpdateLastName = document.getElementById(`updateLastName-${index}`).value;
  const getUpdatePhone = document.getElementById(`updatePhone-${index}`).value;
  const getUpdateEmail = document.getElementById(`updateEmail-${index}`).value;
  contacts[index] = {
    firstName: getUpdateFirstName,
    lastName: getUpdateLastName,
    phoneNumber: getUpdatePhone,
    email: getUpdateEmail,
  }
  saveContact(contacts);
  renderContact();
}

// console.log(getContact())

function deleteContact(index) {
    console.log('delete');
    const contacts = getContact()
    contacts.splice(index,1)
    saveContact()
    renderContact()
}
// console.log(getContact())
document.getElementById("contactForm").addEventListener("submit", saveContacts);