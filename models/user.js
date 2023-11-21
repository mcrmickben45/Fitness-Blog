'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};


// users
const fs = require('fs');
const bcrypt = require('bcrypt');

const USERS_FILE = 'users.json';

function readUsers() {
  const usersData = fs.readFileSync(USERS_FILE, 'utf8');
  return JSON.parse(usersData);
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users), 'utf8');
}

function registerUser(username, email, password) {
  const users = readUsers();

  const isUserExists = users.some(user => user.username === username || user.email === email);

  if (isUserExists) {
    return null; 
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  writeUsers(users);

  return newUser;
}

function findUserByEmail(email) {
  const users = readUsers();
  return users.find(user => user.email === email);
}

function authenticateUser(email, password) {
  const user = findUserByEmail(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  return null; 
}

module.exports = {
  registerUser,
  authenticateUser,
};
