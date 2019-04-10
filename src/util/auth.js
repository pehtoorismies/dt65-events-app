// @flow
const AUTH_TOKEN = 'dt65token';

const isAuthenticated = (): boolean => !!localStorage.getItem(AUTH_TOKEN);

const login = (token: string) =>
  localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));

const getToken = () => {
  const value = localStorage.getItem(AUTH_TOKEN);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
const logout = () => localStorage.removeItem(AUTH_TOKEN);

export { login, logout, getToken, isAuthenticated };
