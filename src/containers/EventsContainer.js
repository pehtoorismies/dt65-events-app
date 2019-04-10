// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../constants';

type Props = {
  history: any,
};

const EventsContainer = (props: Props) => {
  const { history: h } = props;
  return (
    <div><h1>EVENTS </h1><h1>EVENTS </h1><h1>EVENTS </h1><h1>EVENTS </h1><h1>EVENTS </h1><h1>EVENTS </h1></div>
  ) ;
};

export default withRouter(EventsContainer);
