// @flow
import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import { colors } from '../../../util/themeAx';

const Title = styled(Text).attrs({
  fontSize: [4, 5, 6],
})``;


const Divider = styled.div`
  border-top: 1px solid ${colors('lightestgrey')};
  margin-bottom: 8px;
  width: 90%;
  text-align: center;
  margin: 0 auto 8px auto;
`;


// eslint-disable-next-line react/prop-types
const CustomError = ({ children }) => {
  return (
    <Text color="red" fontWeight="bold">
      {children}
    </Text>
  );
};


export { Title, CustomError, Divider };
