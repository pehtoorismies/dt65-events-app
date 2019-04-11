// @flow
import React from 'react';
import { Flex, Text, Card } from 'rebass';
import styled from 'styled-components';
import { map } from 'ramda';
import { DownArrow } from 'styled-icons/boxicons-regular/DownArrow';
import HeadCountButton from './HeadCountButton';
import type { Event, Participant } from '../../flow-types';
import { colors } from '../../util/themeAx';

type Props = {
  event: Event,
};

const DArrow = styled(DownArrow)`
  color: ${colors('white')};
  width: 15px;

`;

const MainContent = styled(Flex)`
  /* border-top: 0;
  border-left: 2px solid blue;
  border-right: 2px solid blue; */
  border-bottom: 1px solid ${colors('lightgray')};
`;

const Wrapper = styled(Flex)`
  max-width: 400px;
`;

const EventTypeTitle = styled(Text)`
  /* offset-x | offset-y | blur-radius | color */
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
  border-radius: 8px;
  margin: 2px;
`;
/*
const renderPill = (participant: Participant) => {
  const { username, id } = participant;
  return (
    <Pill justifyContent="center" alignItems="center" bg="blue" p={1} key={id}>
      <Text px={1} fontSize={14} color="white">
        {username}
      </Text>
    </Pill>
  );
};

<Flex p={1}>{map(renderPill, participants)}</Flex>
*/

const EventBox = (props: Props) => {
  const { event } = props;
  const { name, date, participants } = event;
  const count = participants.length;
  return (
    <Wrapper p={3}>
      <Card
        width="100%"
        mx="auto"
        variant="basic"
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      >
        <ImageBox alignItems="center" justifyContent="center">
          <EventTypeTitle
            letterSpacing={4}
            color="white"
            fontSize={40}
            fontWeight={900}
          >
            Suunnistus
          </EventTypeTitle>
        </ImageBox>

        <MainContent p={2} bg="darkWhite" justifyContent="space-between">
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
        </MainContent>
        <Flex bg="blue" justifyContent="center" alignItems="center" p={1} flexDirection="column">
          <Text color="white" fontSize={14}>Näytä Lisää</Text>
          <DArrow />
        </Flex>
        
      </Card>
    </Wrapper>
  );
};

export default EventBox;
