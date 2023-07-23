const { contextBridge, ipcRenderer } = require("electron");

console.log(location.href);

loginBridge = {
  addUser: (username, password) =>
    ipcRenderer.send("addUser", username, password),

  verifyUser: (username, password) => {
    console.log("hey there");
    ipcRenderer.send("verifyUser", username, password);
  },

  handleError: (callback) => ipcRenderer.on("error-message", callback),
};

homeBridge = {
  handleImage: (callback) => ipcRenderer.on("load-image", callback),

  handlePopular: (callback) => ipcRenderer.on("load-popular", callback),

  searchGames: (searchString) => {
    console.log("hey there");
    ipcRenderer.send("searchGames", searchString);
  },
};

if (location.href.endsWith("home_index.html")) {
  bridge = homeBridge;
} else if (location.href.endsWith("login_index.html")) {
  console.log(loginBridge);
  bridge = loginBridge;
}

contextBridge.exposeInMainWorld("electronAPI", bridge);
