// @flow
import React from 'react';
import { Text, Flex } from 'rebass';
import styled from 'styled-components';
import { User } from 'styled-icons/boxicons-regular/User';

import { colors } from '../../util/themeAx';

type Props = {
  count: number,
  onClick: () => void,
};

const UserIcon = styled(User)`
  width: 20px;
  height: 20px;
  color: ${colors('white')};
`;

const Count = styled(Flex)`
  border-radius: 50%;
  height: 55px;
  width: 55px;
  border: 2px solid white;
  cursor: pointer;
`;

const HeadCountButton = (props: Props) => {
  const { count, onClick } = props;
  return (
    <Count
      onClick={onClick}
      bg="pink"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <UserIcon />
      <Text fontSize={18} color="white" fontWeight="bold">
        {count}
      </Text>
    </Count>
  );
};

export default HeadCountButton;
