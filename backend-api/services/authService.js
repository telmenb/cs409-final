const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/userAuth');

async function userExists(username) {
  return UserAuth.findOne({ username });
}

async function createUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = { username: user.username, password: hashedPassword };
  await UserAuth.create(newUser);
}

async function checkLoginAndReturnUser(user) {
  const foundUser = await UserAuth.findOne({ username: user.username });
  if (!foundUser) {
    return Promise.resolve(undefined);
  }
  if (await bcrypt.compare(user.password, foundUser.password)) {
    const token = jwt.sign(foundUser.username, process.env.ACCESS_TOKEN_SECRET);
    return { username: foundUser.username, token };
  }
  return Promise.resolve(undefined);
}

async function clearUserAuthCollection() {
  await UserAuth.deleteMany({});
}

module.exports = {
  userExists, createUser, checkLoginAndReturnUser, clearUserAuthCollection,
};
