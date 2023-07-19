const Store = require("electron-store");

const store = new Store({
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
  access_token: {
    type: "string",
  },
  expires_in: {
    type: "number",
  },
});

function storeItem(desc, item) {
  return store.set(desc, item);
}

function retrieveItem(item) {
  return store.get(item);
}

module.exports = {
  storeItem,
  retrieveItem,
};
