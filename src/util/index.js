import { findIndex, propEq } from 'ramda';

const isParticipating = (username, participants) => {
  return findIndex(propEq('username', username || ''))(participants || []) >= 0;
};

// eslint-disable-next-line import/prefer-default-export
export { isParticipating };
