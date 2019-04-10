// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import type { history } from 'react-router-dom';
import MenuList from '../components/MenuList';

type Props = {
  history: history,
};

const menuItems = [
  {
    id: 1,
    title: 'Tapahtumat',
    link: '/events',
  },
  {
    id: 2,
    title: 'Luo tapahtuma',
    link: '/create-event',
  },
  {
    id: 3,
    title: 'Profiili',
    link: '/profile',
  },
  {
    id: 4,
    title: 'Logout',
    link: '/logout',
  },
];

const MenuListContainer = (props: Props) => {
  const { history: h } = props;
  const onMenuItemClick = link => {
    h.push(link);
  };

  return <MenuList menuItems={menuItems} onMenuItemClick={onMenuItemClick} />;
};

export default withRouter(MenuListContainer);
