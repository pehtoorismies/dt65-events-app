// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'rebass';
import { DownArrow } from 'styled-icons/boxicons-regular/DownArrow';
import { Button } from '../Common';
import { colors } from '../../util/themeAx';

type Props = {
  animTime?: number,
  fullyOpen: boolean,
  setShowDetails: (show: boolean) => any,
  showDetails: boolean,
  onDeleteClick: () => any,
  onEditClick: () => any,
};

const RoundFlex = styled(Flex)`
  border-radius: 0 0 15px 15px;
`;

const DArrow = styled(DownArrow)`
  color: ${colors('white')};
  width: 20px;
  transform: rotate(${props => (props.down ? 180 : 0)}deg);
  transition: all ${props => props.animTime}ms;
`;

const EditButtons = (props: Props) => {
  const {
    fullyOpen,
    setShowDetails,
    showDetails,
    onDeleteClick,
    onEditClick,
    animTime,
  } = props;

  if (fullyOpen) {
    return (
      <Fragment>
        <Flex justifyContent="center" alignItems="center" py={2}>
          <Button m={1} variant="outline" onClick={onEditClick}>
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
      <DArrow animTime={animTime} down={showDetails} />
    </RoundFlex>
  );
};

EditButtons.defaultProps = {
  animTime: 500,
};

export default EditButtons;
