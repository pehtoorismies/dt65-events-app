// @flow
import React, { Fragment, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { compose, graphql, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { map } from 'ramda';
import { API_URL } from '../config';
import { ROUTES } from '../constants';
import EventBox from '../components/Event/EventBox';
import type { Event } from '../flow-types';

const FUTURE_EVENTS = gql`
  query Events($date: DateTime!) {
    events(where: { date_gt: $date }) {
      id
      title
      race
      participants {
        username
        id
      }
      type
      date
      time
      address
    }
  }
`;

const config = {
  name: 'allFutureEvents',
};

type Props = {
  history: any,
};

const renderEvent = (username: string) => (evt: Event) => {
  const { id } = evt;
  const onParticipateClick = () => console.log('click');
  return (
    <EventBox
      key={id}
      event={evt}
      username={username}
      onParticipateClick={onParticipateClick}
    />
  );
};

const EventsContainer = (props: Props) => {
  const { history: h } = props;
  const today = new Date().toISOString();

  return (
    <Query query={FUTURE_EVENTS} variables={{ date: today }} config={config}>
      {({ loading, error, data }) => {
        if (error) {
          return <h1>Error...</h1>;
        }
        if (loading || !data) {
          return <h1>Loading...</h1>;
        }
        const { events } = data;
        const formattedEvents = map(evt => {
          return {
            ...evt,
            location: evt.address,
            name: evt.title,
            eventType: evt.type,
            date: new Date(evt.date),
          };
        }, events);

        const eventRenderer = renderEvent('some_username');

        return <Fragment>{map(eventRenderer, formattedEvents)}</Fragment>;
      }}
    </Query>
  );
};

export default compose(withRouter)(EventsContainer);
