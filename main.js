const API = "http://localhost:8000/contact";

const btnAdd = document.querySelector(".btn-save");
const inpName = document.querySelector(".inp-name");
const inpSurname = document.querySelector(".inp-surname");
const inpPhoto = document.querySelector(".inp-photo");
const inpNumber = document.querySelector(".inp-number");
const inpEmail = document.querySelector(".inp-email");
const list = document.querySelector(".list");

let newContact = {};

btnAdd.addEventListener("click", (e) => {
  if (
    inpName.value &&
    inpSurname.value &&
    inpPhoto.value &&
    inpNumber.value &&
    inpEmail.value
  ) {
    newContact = {
      name: inpName.value,
      surname: inpSurname.value,
      photo: inpPhoto.value,
      number: inpNumber.value,
      email: inpEmail.value,
    };
    addContact();
  } else {
    alert("Пожалуйста, заполните все поля.");
  }
});

async function addContact() {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
  } catch (error) {
    console.log(error, "ERROR");
  }
  inpName.value = "";
  inpSurname.value = "";
  inpPhoto.value = "";
  inpNumber.value = "";
  inpEmail.value = "";
  getContacts();
}

async function getContacts() {
  try {
    let res = await fetch(API);
    if (res.ok) {
      let contacts = await res.json();
      render(contacts);
    } else {
      console.log("Ошибка при получении контактов:", res.status);
    }
  } catch (error) {
    console.log("Ошибка при получении контактов:", error);
  }
}

function render(contacts) {
  list.innerHTML = "";

  contacts.forEach((item) => {
    list.innerHTML += `
            <li class="list-group-item d-flex
            flex-md-column align-items-center">
            <img src="${item.photo}">
            <p>${item.name}</p>
            <p>${item.surname}</p>
            <p>${item.number}</p>
            <p>${item.email}</p>
            <button onclick="deleteContact(${item.id})" class="btn-delete btn-danger w-auto">Delete</button>
            </li>
            `;
  });
}

async function deleteContact(id) {
  try {
    await fetch(`${API}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.log(error);
  }
  getContacts();
}
getContacts();
