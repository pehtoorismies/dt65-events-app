// @flow
import React from 'react';
import { Flex, Box } from 'rebass';
import EventBox from '../EventBox';
import { Button } from '../../Common';
import { Title } from './Common';

import type { Event } from '../../../flow-types';

type Props = {
  onCreateClick: (title: string, subtitle?: string) => void,
  onPrevClick: () => void,
  event: Event,
};

const StepPreview = (props: Props) => {
  const { onCreateClick, onPrevClick, event } = props;

  return (
    <Box>
      <Title>Esikatselu</Title>
      <EventBox event={event} preview fullyOpen username='' />
      <Flex my={4} width="100%" justifyContent="center">
        <Button m={2} variant="outlinePrimary" onClick={onPrevClick}>
          Takaisin
        </Button>
        <Button m={2} variant="primary" onClick={onCreateClick}>
          Luo
        </Button>
      </Flex>
    </Box>
  );
};

export default StepPreview;
