// @flow
import React from 'react';
import { Flex } from 'rebass';
import { Button } from '../Common';

type Props = {
  onCancelClick?: () => void,
  onCreateClick?: () => void,
};

const PreviewButtons = (props: Props) => {
  const { onCancelClick, onCreateClick } = props;

  return (
    <Flex my={4} width="100%" justifyContent="center">
      <Button m={2} variant="outlinePrimary" onClick={onCancelClick}>
        Sulje
      </Button>
      <Button m={2} variant="primary" onClick={onCreateClick}>
        Luo
      </Button>
    </Flex>
  );
};

PreviewButtons.defaultProps = {
  onCancelClick: () => {},
  onCreateClick: () => {},
};

export default PreviewButtons;
