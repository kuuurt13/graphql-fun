const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList
 } = require('graphql');
const { userType, getUsers, getUserByName } = require('./models/user');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: getUsers
    },
    user: {
      type: userType,
      args: {
        name: {
          type: GraphQLID,
          description: 'Name of user.'
        }
      },
      resolve: (_, args) => getUserByName(args.name)
    }
  }
});

exports.schema = new GraphQLSchema({
  query: queryType
});
