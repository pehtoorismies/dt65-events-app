// @flow

import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'rebass';
import { map } from 'ramda';
import { Close } from 'styled-icons/material/Close';
import type { MenuItem } from '../../flow-types';
import { colors } from '../../util/themeAx';

const CloseIcon = styled(Close)`
  color: ${colors('black')};
  height: 40px;
`;

type Props = {
  menuItems: MenuItem[],
  onMenuItemClick: (link: string) => void,
};

const Menu = styled(Flex)`
  border-bottom: 1px solid ${colors('black')};
`;
const MenuText = styled(Text)`
  text-transform: uppercase;
`;

const renderMenuItem = clicked => (menuItem: MenuItem) => {
  const { link, title, id } = menuItem;
  return (
    <Menu
      key={id}
      onClick={() => clicked(link)}
      justifyContent="center"
      alignItems="center"
    >
      <MenuText color="black" fontWeight={700} py={3} fontSize={3}>
        {title}
      </MenuText>
    </Menu>
  );
};

const MenuList = (props: Props) => {
  const { menuItems, onMenuItemClick } = props;
  const menuRenderer = renderMenuItem(onMenuItemClick);
  return (
    <Box bg="pink" flexDirection>
      <Flex p={3} bg="brown" justifyContent="flex-end">
        <CloseIcon />
      </Flex>

      {map(menuRenderer, menuItems)}
    </Box>
  );
};

export default MenuList;
