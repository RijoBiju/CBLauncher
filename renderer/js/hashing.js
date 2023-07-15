const bcrypt = require("bcrypt");

function hashPassword(password, callback) {
  bcrypt.hash(password, 3, (err, hash) => {
    if (err) {
      callback(err);
    } else {
      callback(null, hash);
    }
  });
}

module.exports = {
  hashPassword,
};
