// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { find, propEq } from 'ramda';
import MenuList from '../components/MenuList';
import { ROUTES } from '../constants';
import { logout, isAuthenticated } from '../util/auth';

const findById = id => find(propEq('id', id));

type Props = {
  history: any,
};

const menuItems = [
  {
    id: 1,
    title: 'Tapahtumat',
    action: history => history.push(ROUTES.home),
  },
  {
    id: 2,
    title: 'Luo tapahtuma',
    action: history => history.push(ROUTES.createEvent),
  },
  {
    id: 3,
    title: 'Profiili',
    action: history => history.push(ROUTES.profile),
  },
  {
    id: 4,
    title: 'Logout',
    action: history => {
      logout();
      history.push(ROUTES.login);
    },
  },
];

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
  const menus = isAuthenticated() ? menuItems : [];

  return <MenuList menuItems={menus} onMenuItemClick={onMenuItemClick} />;
};

export default withRouter(MenuListContainer);
