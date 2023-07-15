const { isValidUsername, isValidPassword } = require("./js/validation");
const { hashPassword } = require("./js/hashing");
const { addUserToDatabase } = require("./js/storeUser");

function addUser(username, password) {
  if (isValidUsername(username) && isValidPassword(password)) {
    hashPassword(password, (err, hash) => {
      if (err) {
        //handle
      }
      if (hash) {
        addUserToDatabase(username, hash);
      }
    });
  }
}

document.querySelector(".buttons button").addEventListener("click", () => {
  let username = document.querySelector(".input-field #username").value;
  let password = document.querySelector(".input-field #password").value;
  addUser(username, password);
});
