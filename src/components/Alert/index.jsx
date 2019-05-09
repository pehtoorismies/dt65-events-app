// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import { Button } from '../Common';

type Props = {
  menuHeight?: number,
  children?: React.Node,
  onOkClick: () => void,
  onCancelClick: () => void,
};

const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;
`;
const Content = styled(Flex)`
  border-radius: 8px;
`;

const Alert = (props: Props) => {
  const { children, onOkClick, onCancelClick, menuHeight } = props;

  return (
    <Wrapper
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      menuHeight={menuHeight}
      bg="transparentBlack"
    >
      <Content flexDirection="column" bg="darkWhite" p={4}>
        {children}
        <Flex>
          <Button m={2} onClick={onOkClick}>
            OK
          </Button>
          <Button variant="outline" m={2} onClick={onCancelClick}>
            Keskeytä
          </Button>
        </Flex>
      </Content>
    </Wrapper>
  );
};

Alert.defaultProps = {
  menuHeight: 80,
};

export default Alert;
