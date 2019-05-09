import { findIndex, propEq } from 'ramda';
import jwtDecode from 'jwt-decode';
import { GRAPHQL_TYPES  } from '../constants'; 

const isParticipating = (username, participants) => {
  return findIndex(propEq('username', username || ''))(participants || []) >= 0;
};

const getLocalUser = token => {
  if (!token) {
    return null;
  }
  const decoded = jwtDecode(token);

  return {
    __typename: GRAPHQL_TYPES.LOCAL_USER,
    username: decoded.nickname,
    id: decoded.sub,
  };
};

export { isParticipating, getLocalUser };
