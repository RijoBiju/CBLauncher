const { app, BrowserWindow, ipcMain } = require("electron");
const { mongoose } = require("mongoose");
const path = require("path");
const { addUser, verifyUser } = require("./renderer/js/register");
const { getGames } = require("./renderer/js/homepage");
const { searchGames } = require("./renderer/js/homepage");
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
    if (verifyUser(username, password))
      win.loadFile("./renderer/home/home_index.html");
    // getGames();
  });

  ipcMain.on("searchGames", (event, searchString) => {
    searchGames(searchString);
  });

  win.loadFile("./renderer/login_index.html");
};

app.whenReady().then(() => {
  mongoose
    .connect(process.env.MONGOURI)
    .then(() => console.log("Successfully connected"))
    .catch((err) => console.log(err));
  createWindow();
});
