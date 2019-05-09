// @flow
import { findIndex, propEq } from 'ramda';
import jwtDecode from 'jwt-decode';
import { GRAPHQL_TYPES } from '../constants';
import { IMAGE_URL } from '../config';

const isParticipating = (username: string, participants) => {
  return findIndex(propEq('username', username || ''))(participants || []) >= 0;
};

const getLocalUser = (token: string) => {
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

const getEventImage = (type: string) => {
  const i = type || 'running';
  return `${IMAGE_URL}/events/${i.toLowerCase()}.jpg`;
};

export { isParticipating, getLocalUser, getEventImage };
