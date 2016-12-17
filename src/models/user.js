const userData = require('../data/user-data');


const getUsers = () => new Promise((resolve) => resolve(userData));

const getUserByName = (name) => new Promise((resolve) => {
  const user =  userData.find(user => {
    return user.name.toLowerCase() === name;
  });

  resolve(user);
});

exports.getUsers = getUsers;
exports.getUserByName = getUserByName;
