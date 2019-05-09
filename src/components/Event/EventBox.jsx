// @flow
import React, { Fragment, useState } from 'react';
import { Box, Flex, Text, Card } from 'rebass';
import styled from 'styled-components';
import { map } from 'ramda';
import { format, getDay } from 'date-fns';
import { DownArrow } from 'styled-icons/boxicons-regular/DownArrow';
import { Medal } from 'styled-icons/fa-solid/Medal';
import AnimateHeight from 'react-animate-height';
import HeadCountButton from './HeadCountButton';
import { Button } from '../Common';
import type { Event, Participant, ID } from '../../flow-types';
import { colors } from '../../util/themeAx';
import { isParticipating, getEventImage } from '../../util'; 
import { WEEK_DAYS } from '../../constants';

const ANIM_TIME = 500;

type Props = {
  event: Event,
  username: string,
  onParticipateClick: (participate: boolean) => void,
  onShowEventClick: (id: ID) => void,
  onDeleteEventClick?: (id: ID) => Promise<void>, 
  loading: boolean,
  fullyOpen: boolean,
};

const DArrow = styled(DownArrow)`
  color: ${colors('white')};
  width: 20px;
  transform: rotate(${props => (props.down ? 180 : 0)}deg);
  transition: all ${ANIM_TIME}ms;
`;

const Race = styled(Medal)`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  color: ${colors('white')};
  width: 30px;
  padding: 4px;
`;

const evtImg = (type: string) => (`url('${getEventImage(type)}')`);

const Wrapper = styled(Flex)`
  max-width: 400px;
  width: 100%;
`;

const EventTypeTitle = styled(Text)`
  text-shadow: 2px 2px 5px ${colors('black')};
`;

const OverButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
`;

const RoundFlex = styled(Flex)`
  border-radius: 0 0 15px 15px;
`

const ImageBox = styled(Flex)`
  background-image: ${props => evtImg(props.eventImage)};
  background-size: cover;
  border-radius: 15px 15px 0 0;
  width: 100%;
  height: 150px;
  position: relative;
`;

const Pill = styled(Flex)`
  margin: 2px;
  border-radius: 4px;
`;

const renderPill = username => (participant: Participant) => {
  const { username: usr, id } = participant;
  const color = username === usr ? 'pink' : 'blue';
  return (
    <Pill bg={color} justifyContent="center" alignItems="center" p={2} key={id}>
      <Text px={1} fontSize={14} color="white">
        {usr}
      </Text>
    </Pill>
  );
};

const getOpenerButton = (
  fullyOpen,
  setShowDetails,
  showDetails,
  onDeleteClick
) => {
  if (fullyOpen) {
    return (
      <Fragment>
        <Flex justifyContent="center" alignItems="center" py={2}>
          <Button m={1} variant="outline">
            Muokkaa
          </Button>
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          py={3}
          flexDirection="column"
          bg="darkWhite"
        >
          <Text color="red" fontWeight="700">
            DANGER ZONE
          </Text>
          <Button m={1} variant="warn" onClick={onDeleteClick}>
            Poista
          </Button>
        </Flex>
      </Fragment>
    );
  }
  return (
    <RoundFlex
      onClick={() => setShowDetails(!showDetails)}
      bg="blue"
      justifyContent="center"
      alignItems="center"
      py={2}
    >
      <DArrow down={showDetails} />
    </RoundFlex>
  );
};

const EventBox = (props: Props) => {
  const {
    event,
    username,
    onParticipateClick,
    onShowEventClick,
    onDeleteEventClick,
    loading,
    fullyOpen,
  } = props;

  const {
    id,
    title,
    subtitle,
    participants,
    location,
    time,
    race,
    type,
    date,
  } = event;

  const [showDetails, setShowDetails] = useState(fullyOpen);

  const isPart = isParticipating(username, participants);
  const formattedDate = format(date, 'DD.MM.YYYY');

  const onDelete = () => {
    if (onDeleteEventClick) {
      onDeleteEventClick(id);
    }
  };

  const count = participants.length;
  return (
    <Wrapper p={2}>
      <Card width="100%" mx="auto" variant="shadow">
        <ImageBox
          eventImage={type.img}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <OverButton onClick={() => onShowEventClick(id)} />
          <EventTypeTitle
            letterSpacing={4}
            color="white"
            fontSize={40}
            fontWeight={900}
          >
            {title}
          </EventTypeTitle>

          <Race isVisible={race} />
        </ImageBox>

        <Flex p={2} bg="darkWhite" justifyContent="space-between">
          <Flex justifyContent="space-around" flexDirection="column">
            <Text fontSize={20} fontWeight="bold">
              {subtitle || type.title}
            </Text>
            <Text fontSize={16}>{WEEK_DAYS[getDay(date)]} {formattedDate}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              disabled={loading}
              highlighted={isPart}
              count={count}
              onClick={() => {
                onParticipateClick(isPart);
              }}
            />
          </Flex>
        </Flex>
        <AnimateHeight duration={ANIM_TIME} height={showDetails ? 'auto' : 0}>
          <Box px={2}>
            <Flex>
              <Text fontWeight="bold" color="lightBlack" width={60}>
                Sijainti:
              </Text>
              <Text ml={1}>{location}</Text>
            </Flex>
            <Flex my={1}>
              <Text fontWeight="bold" color="lightBlack" width={60}>
                Aika:
              </Text>
              <Text ml={1}>{time}</Text>
            </Flex>
            <Flex flexWrap="wrap" py={1}>
              {map(renderPill(username), participants)}
            </Flex>
            <Text fontWeight="bold" color="lightBlack" width={60}>
              Kuvaus:
            </Text>
            <Text my={2}>lorem ipsum</Text>
          </Box>
        </AnimateHeight>
        {getOpenerButton(fullyOpen, setShowDetails, showDetails, onDelete)}
      </Card>
    </Wrapper>
  );
};

EventBox.defaultProps = {
  onDeleteEventClick: () => {},
};

export default EventBox;
