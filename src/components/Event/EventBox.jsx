// @flow
import React, { useState } from 'react';
import { Box, Flex, Text, Card } from 'rebass';
import styled from 'styled-components';
import { map } from 'ramda';
import { format } from 'date-fns';
import { DownArrow } from 'styled-icons/boxicons-regular/DownArrow';
import { Medal } from 'styled-icons/fa-solid/Medal';
import AnimateHeight from 'react-animate-height';
import HeadCountButton from './HeadCountButton';
import type { Event, Participant } from '../../flow-types';
import { colors } from '../../util/themeAx';
import { isParticipating } from '../../util';

const ANIM_TIME = 500;

type Props = {
  event: Event,
  username: string,
  onParticipateClick: (participate: boolean) => void,
  loading: boolean,
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

const Wrapper = styled(Flex)`
  max-width: 400px;
`;

const EventTypeTitle = styled(Text)`
  text-shadow: 2px 2px 5px ${colors('black')};
`;

const ImageBox = styled(Flex)`
  background-image: url(https://source.unsplash.com/random/812x300);
  background-size: cover;
  border-radius: 15px 15px 0 0;
  width: 100%;
  height: 150px;
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

const EventBox = (props: Props) => {
  const { event, username, onParticipateClick, loading } = props;

  const {
    title,
    subtitle,
    participants,
    location,
    time,
    race,
    type,
    date,
  } = event;

  const [showDetails, setShowDetails] = useState(false);

  const isPart = isParticipating(username, participants);
  const formattedDate = format(date, 'DD.MM.YYYY');

  const count = participants.length;
  return (
    <Wrapper py={1}>
      <Card width="100%" mx="auto" variant="shadow">
        <ImageBox
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
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
              {subtitle}
            </Text>
            <Text fontSize={16}>{formattedDate}</Text>
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
            <Text my={1}>lorem ipsum</Text>
          </Box>
        </AnimateHeight>
        <Flex
          onClick={() => setShowDetails(!showDetails)}
          bg="blue"
          justifyContent="center"
          alignItems="center"
          py={2}
        >
          <DArrow down={showDetails} />
        </Flex>
      </Card>
    </Wrapper>
  );
};

export default EventBox;
