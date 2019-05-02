import ApolloClient from 'apollo-boost';
import jwtDecode from 'jwt-decode';
import { getIdToken, getAccessToken } from './auth';

const TYPE_LOCALUSER = 'LocalUser';

const getLocalUser = token => {
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);

  return {
    __typename: TYPE_LOCALUSER,
    username: decoded.email,
    age: 14,
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
  },
  request: operation => {
    operation.setContext({ headers: getAuthHeaders() });
  },
});

export default client;
