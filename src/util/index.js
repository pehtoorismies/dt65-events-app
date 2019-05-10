// @flow
import { findIndex, propEq, find } from 'ramda';
import jwtDecode from 'jwt-decode';
import { GRAPHQL_TYPES, EVENT_TYPES } from '../constants';
import { IMAGE_URL } from '../config';

import type { EventCategory, EventType } from '../flow-types';

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

const typeFromEvent: EventType = (eventCategory?: EventCategory) => {
  return find(propEq('type', eventCategory))(EVENT_TYPES);
};

export { isParticipating, getLocalUser, getEventImage, typeFromEvent };
