const { isValidUsername, isValidPassword } = require("./validation");
const { hashPassword } = require("./hashing");
const { addUserToDatabase } = require("./storeUser");

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

module.exports = {
  addUser,
};
