// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'rebass';
import { map } from 'ramda';
import { HamburgerStandReverse } from 'react-animated-burgers';
import type { MenuItem, ID } from '../../flow-types';
import { colors } from '../../util/themeAx';

type Props = {
  menuItems?: MenuItem[],
  onMenuItemClick: (id: ID, history: any) => void,
};

const Menu = styled(Flex)`
  cursor: pointer;
  /* border-bottom: 1px solid ${colors('white')}; */
  /* border-top: 1px solid ${colors('white')}; */
`;
const MenuText = styled(Text)`
  text-transform: uppercase;
`;

const Menubar = styled(Flex)`
  height: 80px;
`;
const MenuBox = styled(Flex)`
  position: fixed;
  right: ${props => (props.isActive ? 0 : -300)}px;
  top: 80px;
  transition-property: right;
  transition-duration: 0.5s;
  z-index: 20;
`;

const renderMenuItem = clicked => (menuItem: MenuItem) => {
  const { title, id } = menuItem;
  return (
    <Menu ml={3} key={id} onClick={() => clicked(id)} width="100%">
      <MenuText color="white" fontWeight={700} py={3} fontSize={3}>
        {title}
      </MenuText>
    </Menu>
  );
};

const MenuList = (props: Props) => {
  const { menuItems, onMenuItemClick } = props;
  const [isActive, setActive] = useState(false);

  const onClick = id => {
    setActive(false);
    onMenuItemClick(id);
  };

  const showMenuIcon = menuItems && menuItems.length > 0;
  const menuIcon = showMenuIcon ? (
    <HamburgerStandReverse
      barColor="white"
      isActive={isActive}
      toggleButton={() => setActive(!isActive)}
    />
  ) : null;

  const menuRenderer = renderMenuItem(onClick);
  return (
    <React.Fragment>
      <Menubar bg="pink" alignItems="center" justifyContent="space-between">
        <Text ml={2} color="white" fontWeight={700}>
          DT65 Events
        </Text>
        {menuIcon}
      </Menubar>
      <MenuBox bg="pink" flexDirection="column" width={300} isActive={isActive}>
        {map(menuRenderer, menuItems || [])}
      </MenuBox>
    </React.Fragment>
  );
};

MenuList.defaultProps = {
  menuItems: [],
};

export default MenuList;
