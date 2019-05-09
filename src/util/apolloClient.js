import ApolloClient from 'apollo-boost';
import jwtDecode from 'jwt-decode';
import { getIdToken, getAccessToken, logout } from './auth';

const TYPE_LOCALUSER = 'LocalUser';

const getLocalUser = token => {
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);

  return {
    __typename: TYPE_LOCALUSER,
    username: decoded.nickname,
    id: decoded.sub,
  };
};

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
