const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString
 } = require('graphql');
const { getUsers, getUserByName } = require('./models/user');

const app = express();

const userType = new GraphQLObjectType({
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
      resolve: (_, args) => {
        return getUserByName(args.name);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4040, () => console.log('App listening at 4040'));
