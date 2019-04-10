import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MenuList from './index';

const menuItems = [
  { id: 1, link: '/joku', title: 'title' },
  { id: 2, link: '/joku', title: 'title' },
  { id: 3, link: '/joku', title: 'title' },
  { id: 4, link: '/joku', title: 'title' },
];

storiesOf('MenuList', module)
  .add('closed', () => (
    <MenuList menuItems={menuItems} onClick={action('clicked')} />
  ))
  .add('empty', () => (
    <MenuList menuItems={[]} onClick={action('clicked')} />
  ))
  .add('null', () => (
    <MenuList menuItems={null} onClick={action('clicked')} />
  ));
