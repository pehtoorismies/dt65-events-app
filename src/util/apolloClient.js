import ApolloClient from 'apollo-boost';
import { getIdToken, getAccessToken, logout } from './auth';
import { getLocalUser } from './index'

const getAuthHeaders = () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return null;
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  headers: getAuthHeaders(),
  clientState: {
    defaults: {
      localUser: getLocalUser(getIdToken()),
    },
    resolvers: {
      Mutation: {
        logoutLocalUser: (_, variables, { cache }) => {
          logout();
          cache.writeData({
            data: {
              localUser: null
            },
          });

          return null;
        }
      },
    },
    typeDefs: `
      type LocalUser {
        id: String!
        username: String!return null null
      }
      type Popup {
        visible: Boolean!
      }

      type Query {
        localUser: LocalUser 
      }
      type Mutation {
        logoutLocalUser: Boolean! 
      }
  `,
  },
  request: operation => {
    operation.setContext({ headers: getAuthHeaders() });
  },
});

export default client;
