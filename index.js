import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-301c8-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingCart = ref(database, "shoppingCart");
// const kibiras = ref(database, "Kibiras");

const inputFieldEl = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const ulEl = document.getElementById("shopping-list");

onValue(shoppingCart, function (snapshot) {
  if (snapshot.exists()) {
    let shopingListArray = Object.entries(snapshot.val());
    resetshopingListEl();
    for (let i = 0; i < shopingListArray.length; i++) {
      let currentBook = shopingListArray[i];
      addListElementToDOM(currentBook);
    }
  } else {
    let textToPrint = "No items available";
    ulEl.innerHTML = "";
  }
});

addButton.addEventListener("click", () => {
  const inputValue = inputFieldEl.value;
  push(shoppingCart, inputValue);
  console.log(inputValue);
  resetInputValue();
});

function resetInputValue() {
  inputFieldEl.value = "";
}

function resetshopingListEl() {
  ulEl.innerHTML = "";
}

function addListElementToDOM(item) {
  // const listElementString = `<li>${value}</li>`;
  // ulEl.innerHTML += listElementString;
  let itemId = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");
  newEl.textContent = itemValue;
  ulEl.append(newEl);

  newEl.addEventListener("click", () => {
    let databaseItemToDelete = ref(database, `shoppingCart/${itemId}`);
    remove(databaseItemToDelete);
  });
}
