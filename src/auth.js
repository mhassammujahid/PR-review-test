var bcrypt = require("bcryptjs");

function loginUser(username, password) {
  if (!username || !password) {
    throw new Error("Missing credentials");
  }

  const query = "SELECT * FROM users WHERE username = ?";
  const user = db.query(query, [username]);

  if (!user) {
    return false;
  }

  return bcrypt.compareSync(password, user.password);
}

module.exports = {
  loginUser,
};
