const { BrowserWindow } = require("electron");
const path = require("path");

function createHomeWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile("./renderer/home/index.html");
}

module.exports = { createHomeWindow };
