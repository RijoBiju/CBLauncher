const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  addUserToDatabase: (username, password) =>
    ipcRenderer.send("addUserToDatabase", username, password),
});
