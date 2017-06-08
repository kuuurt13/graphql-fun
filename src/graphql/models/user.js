const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
 } = require('graphql');
const User = require('../../db/models/user');

exports.userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: {
    name: {
      type: GraphQLID,
      description: 'Name of user.'
    },
    surname: {
      type: GraphQLString,
      description: 'Surname of user.'
    },
    gender: {
      type: GraphQLString,
      description: 'Gender of user.'
    },
    region: {
      type: GraphQLString,
      description: 'What region user is from.'
    }
  }
});

exports.getUsers = () => new Promise((resolve) => {
  User.find((err, users) => {
    if (err) resolve([]);
    resolve(users);
  });
});

exports.getUserByName = (name) => new Promise((resolve) => {
  User.findOne({ name }, (err, user) => {
    if (err) resolve(null);
    resolve(user);
  });
});
