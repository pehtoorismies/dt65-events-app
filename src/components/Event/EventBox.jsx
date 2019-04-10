// @flow
import React from 'react';
import { Flex, Text, Card, Image, Box } from 'rebass';
import styled from 'styled-components';
import { User } from 'styled-icons/boxicons-regular/User';
import type { Event } from '../../flow-types';

type Props = {
  event: Event,
};
const UserIcon = styled(User)`
  /* width: 20px; */
  height: 20px;
`;

const MainContent = styled(Flex)`
  /* border-top: 0;
  border-left: 2px solid blue;
  border-right: 2px solid blue; */
  border-bottom: 2px solid blue;
`;

const Count = styled(Flex)`
  border-radius: 25px;
  height: 50px;
  width: 70px;
`;

const EventBox = (props: Props) => {
  const { event } = props;
  const { name, date } = event;
  return (
    <Flex p={3}>
      <Card
        width="100%"
        mx="auto"
        variant="basic"
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
      >
        <Image
          src="https://source.unsplash.com/random/512x250"
          borderRadius="15px 15px 0 0"
        />
        <MainContent justifyContent="space-between">
          <Box m={1}>
            <Text fontSize={20} fontWeight="bold">
              {name}
            </Text>
            <Text my={2} fontSize={20}>
              11.12.2019
            </Text>
          </Box>
          <Count
            bg="pink"
            m={2}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"

          >
            <UserIcon />
            <Text fontSize={20} fontWeight="bold">
              20
            </Text>
          </Count>
          <Flex>

            
          </Flex>
        </MainContent>
      </Card>
    </Flex>
  );
};

export default EventBox;
