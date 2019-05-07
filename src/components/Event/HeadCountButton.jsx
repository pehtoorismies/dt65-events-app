// @flow
import React, { Fragment } from 'react';
import { Text, Flex } from 'rebass';
import styled, {keyframes} from 'styled-components';
import { User } from 'styled-icons/boxicons-regular/User';
import { LoaderAlt } from 'styled-icons/boxicons-regular/LoaderAlt';

import { colors } from '../../util/themeAx';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

type Props = {
  count: number,
  onClick: () => void,
  highlighted: boolean,
  disabled: boolean,
};

const UserIcon = styled(User)`
  width: 20px;
  height: 20px;
  color: ${colors('white')};
`;

const LoaderIcon = styled(LoaderAlt)`
  width: 26px;
  height: 26px;
  color: ${colors('white')};
  animation: ${rotate} 1s linear infinite;
`;

const Count = styled(Flex)`
  border-radius: 50%;
  height: 55px;
  width: 55px;
  border: 2px solid white;
  cursor: pointer;
`;

const getContent = (disabled, count) => {
  if (disabled) {
    return <LoaderIcon />;
  }
  return (
    <Fragment>
      <UserIcon />
      <Text fontSize={18} color="white" fontWeight="bold">
        {count}
      </Text>
    </Fragment>
  );
};

const HeadCountButton = (props: Props) => {
  const { count, onClick, highlighted, disabled } = props;
  const content = getContent(disabled, count);
  const clicked = disabled ? null : onClick;
  return (
    <Count
      onClick={clicked}
      bg={highlighted ? 'pink' : 'blue'}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {content}
    </Count>
  );
};

export default HeadCountButton;
