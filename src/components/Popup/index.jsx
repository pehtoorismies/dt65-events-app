// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import { Button } from '../Common';

type Props = {
  showModal?: boolean,
  onOkClick?: any,
  onCancelClick?: any,
};

const Wrapper = styled.div`
  display: ${props => (props.visible ? 'flex' : 'none')};
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: 'column';
  z-index: 2;
  height: calc(100vh - 80px);
  width: 100vw;
  background: rgba(0, 0, 0, 0.8);
`;

const Content = styled(Flex)`
  border-radius: 8px;
`;

const Popup = (props: Props) => {
  const { showModal, onOkClick, onCancelClick } = props;
  return (
    <Wrapper visible={showModal}>
      <Content flexDirection="column" bg="darkWhite" p={4}>
        Content

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

Popup.defaultProps = {
  showModal: false,
  onOkClick: () => {},
  onCancelClick: () => {},
};
export default Popup;
