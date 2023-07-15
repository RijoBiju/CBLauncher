const { app, BrowserWindow } = require("electron");
const { mongoose } = require("mongoose");
require("dotenv").config();

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("./renderer/index.html");
};

app.whenReady().then(() => {
  mongoose
    .connect(process.env.MONGOURI)
    .then(() => console.log("Successfully connected"));
  createWindow();
});
