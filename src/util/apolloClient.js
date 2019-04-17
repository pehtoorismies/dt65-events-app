import ApolloClient from 'apollo-boost';
// import jwtDecode from 'jwt-decode';
// import { ACCESS_TOKEN, ID_TOKEN, TYPE_LOCALUSER } from './util/constants';

// const idToken = localStorage.getItem(ID_TOKEN);

// const getLocalUser = token => {
//   if (!token) {
//     return null;
//   }
//   return {
//     __typename: TYPE_LOCALUSER,
//     username: jwtDecode(idToken).name,
//   };
// };

const getAuthHeaders = () => {
  return null;
  // const accessToken = localStorage.getItem(ACCESS_TOKEN);
  // if (!accessToken) {
  //   return null;
  // }
  // return {
  //   Authorization: `Bearer ${accessToken}`,
  // };
};

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVER,
  headers: getAuthHeaders(),
  clientState: {
    defaults: {
      // localUser: getLocalUser(idToken),
    },
  },
  request: operation => {
    operation.setContext({ headers: getAuthHeaders() });
  },
});

export default client;
