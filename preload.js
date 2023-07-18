const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  addUser: (username, password) =>
    ipcRenderer.send("addUser", username, password),

  verifyUser: (username, password) =>
    ipcRenderer.send("verifyUser", username, password),

  handleError: (callback) => ipcRenderer.on("error-message", callback),
});
