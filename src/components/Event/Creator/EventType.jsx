// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { map } from 'ramda';
import { CheckCircle } from 'styled-icons/fa-regular/CheckCircle';
import { Flex, Text } from 'rebass';
import { Title } from './Common';
import { colors } from '../../../util/themeAx';

import type { EventType as ET } from '../../../flow-types';

type Event = {
  type: ET,
  title: string,
};
type EventClick = (type: ET) => void;
type Props = {
  onEventClick: EventClick,
  events: Event[],
  preSelected: ET,
};

const EvtButton = styled(Flex)`
  cursor: pointer;
`;

const CheckMark = styled(CheckCircle)`
  color: ${colors('white')};
  width: ${props => (props.selected ? 20 : 0)}px;
  transition-property: width;
  transition-duration: 0.2s;
`;

const renderEvent = (onClick: EventClick, preSelected: ET) => (
  event: Event
) => {
  const { title, type } = event;
  const selected = preSelected === type;
  const bgColor = selected ? 'pink' : 'blue';

  return (
    <EvtButton
      m={1}
      p={3}
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      key={type}
      onClick={() => onClick(type)}
      width="100%"
    >
      <Text mr={2} color="white">
        {title}
      </Text>
      <CheckMark selected={selected} />
    </EvtButton>
  );
};

const EventType = (props: Props) => {
  const { onEventClick, events, preSelected } = props;
  const [selectedType, setSelectedType] = useState(preSelected);

  const onClick = evt => {
    setSelectedType(evt);
    setTimeout(() => onEventClick(evt), 300);
  };

  const eventRenderer = renderEvent(onClick, selectedType);
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Title>Tapahtumatyyppi</Title>
      {map(eventRenderer, events)}
    </Flex>
  );
};

export default EventType;
