const { BrowserWindow } = require("electron");

function formPageError(errorMessage) {
  let win = BrowserWindow.getFocusedWindow();
  win.webContents.send("error-message", errorMessage);
}

module.exports = {
  formPageError,
};
