const { isValidUsername, isValidPassword } = require("./validation");
const { hashPassword, verifyPassword } = require("./hashing");
const { addUserToDatabase, loadHash } = require("./database");
const { formPageError } = require("./errors");
const { BrowserWindow } = require("electron");

async function addUser(username, password) {
  if (!(isValidUsername(username) && isValidPassword(password))) {
    formPageError("Username or Password requirement not met");
    return;
  }
  let hashedPassword = await hashPassword(password);
  addUserToDatabase(username, hashedPassword);
}

async function verifyUser(username, password) {
  if (!(isValidUsername(username) && isValidPassword(password))) {
    formPageError("Username or Password requirement not met");
    return;
  }
  let hash = await loadHash(username);
  if (!hash) {
    formPageError("Check internet connection");
    return;
  }
  if (!(await verifyPassword(password, hash))) {
    formPageError("Password is incorrect");
    return;
  }
  return true;
}

module.exports = {
  addUser,
  verifyUser,
};
