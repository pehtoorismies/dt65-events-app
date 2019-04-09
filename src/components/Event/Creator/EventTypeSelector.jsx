// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { map } from 'ramda';
import { CheckCircle } from 'styled-icons/fa-regular/CheckCircle';
import { Flex, Text, Box } from 'rebass';
import { colors } from '../../../util/themeAx';

import type {
  EventCategory,
  EventType,
  EventCatergoryClick,
} from '../../../flow-types';

type Props = {
  onEventClick: EventCatergoryClick,
  eventTypes: EventType[],
  preSelected: EventCategory,
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 3fr));
  justify-items: center;
  grid-gap: 5px;
  width: 100%;
`;

const EvtButton = styled(Flex)`
  cursor: pointer;
  border-radius: 8px;
  height: 50px;
`;

const CheckMark = styled(CheckCircle)`
  color: ${colors('white')};
  width: ${props => (props.selected ? 20 : 0)}px;
  transition-property: width;
  transition-duration: 0.2s;
`;

const renderEvent = (
  onClick: EventCatergoryClick,
  preSelected: EventCategory
) => (event: EventType) => {
  const { title, type } = event;
  const selected = preSelected === type;
  const bgColor = selected ? 'pink' : 'blue';

  return (
    <EvtButton
      p={3}
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      key={type}
      onClick={() => onClick(type)}
      width={150}
    >
      <Text mr={2} color="white" fontWeight="bold">
        {title}
      </Text>
      <CheckMark selected={selected} />
    </EvtButton>
  );
};

const EventTypeSelector = (props: Props) => {
  const { onEventClick, eventTypes, preSelected } = props;
  const [selectedType, setSelectedType] = useState(preSelected);

  const onClick = cat => {
    setSelectedType(cat);
    onEventClick(cat);
  };

  const eventRenderer = renderEvent(onClick, selectedType);

  return (
    <Box width="100%" >
      <Text width="100%" color="darkgrey" m={2}>
        tyyppi
      </Text>
      <Grid>{map(eventRenderer, eventTypes)}</Grid>
    </Box>
  );
};

export default EventTypeSelector;
