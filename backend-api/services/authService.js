const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

function userExists(username) {
  return users.find((user) => user.username === username);
}

async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { username: user.username, password: hashedPassword };
  users.push(newUser);
}

async function checkLoginAndReturnUser(user) {
  const foundUser = users.find((findUser) => findUser.username === user.username);
  if (!foundUser) {
    return Promise.resolve(undefined);
  }
  if (await bcrypt.compare(user.password, foundUser.password)) {
    const token = jwt.sign(foundUser.username, process.env.ACCESS_TOKEN_SECRET);
    return { username: foundUser.username, token };
  }
  return Promise.resolve(undefined);
}

module.exports = { userExists, createUser, checkLoginAndReturnUser };
