// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { find, propEq, filter, reject } from 'ramda';
import MenuList from '../components/MenuList';
import { ROUTES } from '../constants';
import { logout, isAuthenticated } from '../util/auth';

const findById = id => find(propEq('id', id));

type Props = {
  history: any,
};

const menuItems = [
  {
    id: 5,
    title: 'Kirjaudu',
    action: history => history.push(ROUTES.login),
    public: true,
  },
  {
    id: 7,
    title: 'Unohdin salasanani',
    action: history => history.push(ROUTES.forgotPassword),
    public: true,
  },
  {
    id: 10,
    title: 'Rekisteröidy',
    action: history => history.push(ROUTES.register),
    public: true,
  },
  {
    id: 20,
    title: 'Tapahtumat',
    action: history => history.push(ROUTES.home),
  },
  {
    id: 30,
    title: 'Luo tapahtuma',
    action: history => history.push(ROUTES.createEvent),
  },
  {
    id: 40,
    title: 'Profiili',
    action: history => history.push(ROUTES.profile),
  },
  {
    id: 50,
    title: 'Logout',
    action: history => {
      logout();
      history.push(ROUTES.login);
    },
  },
];

const isPublicFilter = menuItem => !!menuItem.public;

const filterMenus = (isAuth, menus) => {
  if (isAuth) {
    return reject(isPublicFilter, menus)
  }
  return filter(isPublicFilter, menus)
}

const MenuListContainer = (props: Props) => {
  const { history: h } = props;
  const onMenuItemClick = id => {
    const menuItem = findById(id)(menuItems);
    if (!menuItem) {
      console.error('No menu item found');
      return;
    }
    menuItem.action(h);
  };
  
  const menus = filterMenus(isAuthenticated(), menuItems);

  return <MenuList menuItems={menus} onMenuItemClick={onMenuItemClick} />;
};

export default withRouter(MenuListContainer);
