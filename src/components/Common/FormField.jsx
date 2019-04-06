// @flow
import React from 'react';
import styled from 'styled-components';
import { ErrorText, Input } from './index';

type Props = {
  label: string,
  error?: string,
};

const Wrapper = styled.label`
  display: block;
  margin-top: 5px;
`;
const Span = styled.span`
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  /* color: $text-color; */
  color: #999;
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
