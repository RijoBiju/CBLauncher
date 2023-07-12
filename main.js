const { app, BrowserWindow, screen } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1200,
    height: 700,
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});
