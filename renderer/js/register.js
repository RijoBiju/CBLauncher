const { isValidUsername, isValidPassword } = require("./validation");
const { hashPassword, verifyPassword } = require("./hashing");
const { addUserToDatabase } = require("./storeUser");

function addUser(username, password) {
  if (isValidUsername(username) && isValidPassword(password)) {
    let hashedPassword = hashPassword(password);
    if (hashedPassword) {
      addUserToDatabase(username, hashedPassword);
    } else {
    }
  } else {
  }
}

function verifyUser(username, password) {
  if (isValidUsername(username) && isValidPassword(password)) {
    hashPassword(password, (err, hash) => {
      if (err) {
        //handle
      }
      if (hash) {
        verifyPassword(password);
        addUserToDatabase(username, hash);
      }
    });
  } else {
  }
}

module.exports = {
  addUser,
  verifyUser,
};
