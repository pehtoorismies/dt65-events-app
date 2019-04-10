// @flow
const AUTH_TOKEN = 'dt65token';

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN);
};

export {
  // eslint-disable-next-line import/prefer-default-export
  isAuthenticated,
}
