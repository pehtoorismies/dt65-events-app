// @flow
import React, { useState, Fragment } from 'react';
import { Box, Flex, Text, Card } from 'rebass';
import styled from 'styled-components';
import Color from 'color';
import { map } from 'ramda';
import { DownArrow } from 'styled-icons/boxicons-regular/DownArrow';
import { UpArrow } from 'styled-icons/boxicons-regular/UpArrow';
import { Medal } from 'styled-icons/fa-solid/Medal';
import posed from 'react-pose';
import AnimateHeight from 'react-animate-height';
import HeadCountButton from './HeadCountButton';
import type { Event, Participant } from '../../flow-types';
import { colors } from '../../util/themeAx';
import theme from '../../theme';

type Props = {
  event: Event,
};

const DArrow = styled(DownArrow)`
  color: ${colors('white')};
  width: 15px;
`;
const UArrow = styled(UpArrow)`
  color: ${colors('white')};
  width: 15px;
`;
const Race = styled(Medal)`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  color: ${colors('white')};
  width: 30px;
  padding: 4px;
`;

const Circle = posed.div({
  attention: {
    scale: 1.3,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 0,
    },
  },
});

const getDetailsButton = isShowingDetails => {
  if (isShowingDetails) {
    return (
      <Fragment>
        <UArrow />
        <Text color="white" fontSize={14}>
          Sulje
        </Text>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Text color="white" fontSize={14}>
        Lisätiedot
      </Text>
      <DArrow />
    </Fragment>
  );
};

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

const gradBlue1 = theme.colors.blue;
const gradBlue2 = Color(gradBlue1)
  .lighten(0.1)
  .hsl();

const getGradient = () => {
  return `${gradBlue2}, ${gradBlue1}`;
};

const Pill = styled(Flex)`
  /* border-radius: 4px; */
  margin: 2px;
  background-image: linear-gradient(${getGradient()});
`;

const renderPill = (participant: Participant) => {
  const { username, id } = participant;
  return (
    <Pill justifyContent="center" alignItems="center" p={2} key={id}>
      <Text px={1} fontSize={14} color="white">
        {username}
      </Text>
    </Pill>
  );
};

const EventBox = (props: Props) => {
  const { event } = props;
  const { name, date, participants, location, time, race } = event;

  // const [showDetails, setShowDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const count = participants.length;
  return (
    <Wrapper p={3}>
      <Card
        width="100%"
        mx="auto"
        variant="basic"
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      >
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
            Suunnistus
          </EventTypeTitle>
          <Circle>
            <Race isVisible={race} />
          </Circle>
        </ImageBox>

        <Flex p={2} bg="darkWhite" justifyContent="space-between">
          <Flex justifyContent="space-around" flexDirection="column">
            <Text fontSize={20} fontWeight="bold">
              {name}
            </Text>
            <Text fontSize={20}>11.12.2019</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <HeadCountButton
              count={count}
              onClick={() => {
                console.log('click');
              }}
            />
          </Flex>
        </Flex>
        <AnimateHeight duration={500} height={showDetails ? 'auto' : 0}>
          <Box bg="darkWhite" px={2}>
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
              {map(renderPill, participants)}
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
          flexDirection="column"
        >
          {getDetailsButton(showDetails)}
        </Flex>
      </Card>
    </Wrapper>
  );
};

export default EventBox;
