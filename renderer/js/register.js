const { isValidUsername, isValidPassword } = require("./validation");
const { hashPassword, verifyPassword } = require("./hashing");
const { addUserToDatabase, loadHash } = require("./database");
const { formPageError } = require("./errors");
const { BrowserWindow } = require("electron");
const { authenticate, games } = require("./igdb");
const { retrieveItem } = require("../js/models/Store");

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
  authenticate();
  games();
  let win = BrowserWindow.getFocusedWindow();
  win.loadFile("./renderer/home/index.html");
}

module.exports = {
  addUser,
  verifyUser,
};
