// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'rebass';
import { ArrowRight } from 'styled-icons/fa-solid/ArrowRight';
import { ArrowLeft } from 'styled-icons/fa-solid/ArrowLeft';
import { Button } from '../../Common';
import { colors } from '../../../util/themeAx';

const Title = styled(Text).attrs({
  m: 4,
  fontSize: [5, 6, 7],
})``;

const Next = styled(ArrowRight)`
  color: ${colors('pink')};
  width: 20px;
  margin-left: 10px;
`;
const Prev = styled(ArrowLeft)`
  color: ${colors('pink')};
  width: 20px;
  margin-right: 10px;
`;

const Buttons = props => {
  const { onNextClick } = props;

  return (
    <Flex>
      <Button onNextClick={onNextClick} m={4} variant="outlinePrimary">
        <Prev />
        Edellinen
      </Button>
      <Button onNextClick={onNextClick} m={4} variant="outlinePrimary">
        Seuraava
        <Next />
      </Button>
    </Flex>
  );
};

export { Buttons, Title };
