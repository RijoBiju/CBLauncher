const { app, BrowserWindow, ipcMain } = require("electron");
const { mongoose } = require("mongoose");
const path = require("path");
const { addUser, verifyUser } = require("./renderer/js/register");
require("dotenv").config();

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  ipcMain.on("addUser", (event, username, password) => {
    addUser(username, password);
  });

  ipcMain.on("verifyUser", (event, username, password) => {
    verifyUser(username, password);
  });

  win.loadFile("./renderer/index.html");
};

app.whenReady().then(() => {
  mongoose
    .connect(process.env.MONGOURI)
    .then(() => console.log("Successfully connected"));
  createWindow();
});
