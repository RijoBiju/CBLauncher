const bcrypt = require("bcrypt");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

function verifyPassword(password, hash, callback) {
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

module.exports = {
  hashPassword,
  verifyPassword,
};
