// @flow
import React from 'react';
import styled from 'styled-components';
import { ErrorText, Input } from '../Common';
import { colors } from '../../util/themeAx';

type Props = {
  label: string,
  error?: string,
};

const Wrapper = styled.div`
  display: block;
  margin-top: 5px;
`;
const Span = styled.span`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors('lightgray')};
`;

const FormField = (props: Props) => {
  const { label, error } = props;
  return (
    <Wrapper>
      <Span>{label}</Span>
      <Input {...props} />
      <ErrorText mt={1}>{error}</ErrorText>
    </Wrapper>
  );
};

FormField.defaultProps = {
  error: undefined,
};

export default FormField;
