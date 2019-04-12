// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Creator from '../components/Event/Creator';

type Props = {};
const Wrapper = styled.div``;

const CreateEventsContainer = (props: Props) => {
  const {} = props;
  return (
    
      <Creator />
    
  );
};

export default withRouter(CreateEventsContainer);
