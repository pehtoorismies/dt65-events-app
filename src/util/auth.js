// @flow

const ID_TOKEN = 'dt65IdToken';
const ACCESS_TOKEN = 'dt65AccessToken';
const EXPIRES_IN = 'dt65ExpiresIn';

const isAuthenticated = (): boolean => !!localStorage.getItem(ACCESS_TOKEN);

const login = (idToken: string, accessToken: string, expiresIn: number) => {
  localStorage.setItem(ID_TOKEN, JSON.stringify(idToken));
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(accessToken));
  localStorage.setItem(EXPIRES_IN, JSON.stringify(expiresIn));
};

const getAccessToken = () => {
  const value = localStorage.getItem(ACCESS_TOKEN);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
const getIdToken = () => {
  const value = localStorage.getItem(ID_TOKEN);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
const logout = () => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(EXPIRES_IN);
};

export { login, logout, getAccessToken, getIdToken, isAuthenticated };
