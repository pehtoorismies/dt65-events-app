// @flow
import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { compose, Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { map, propEq, findIndex } from 'ramda';
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

const LOCAL_USER = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;

const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!, $username: String!) {
    joinEvent(eventId: $eventId, username: $username) {
      id
      participants {
        username
        id
      }
    }
  }
`;
const UNJOIN_EVENT = gql`
  mutation UnJoinEvent($eventId: ID!, $username: String!) {
    unjoinEvent(eventId: $eventId, username: $username) {
      id
      participants {
        username
        id
      }
    }
  }
`;

const isParticipating = (username, participants) => {
  const index = findIndex(propEq('username', username || ''))(
    participants || []
  );
  return index >= 0;
};

const config = {
  name: 'allFutureEvents',
};

type Props = {
  history: any,
};

const renderEvent = (username: string) => (evt: Event) => {
  const { id } = evt;
  const joined = isParticipating(username, evt.participants);

  return (
    <Mutation key={id} mutation={JOIN_EVENT}>
      {(
        joinEvent,
        {loading: joinLoading, error: joinError }
      ) => {
        return (
          <Mutation mutation={UNJOIN_EVENT}>
            {(
              unjoinEvent,
              { loading: unjoinLoading, error: unjoinError }
            ) => {
              const action = joined ? unjoinEvent : joinEvent;
              if (unjoinError || joinError) {
                toast.error(`Ilmoittautumisessa ongelmia...`, {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: false,
                });
              }

              
              return (
                <EventBox
                  loading={unjoinLoading || joinLoading}
                  event={evt}
                  username={username}
                  onParticipateClick={() =>
                    action({ variables: { eventId: id, username } })
                  }
                />
              );
            }}
          </Mutation>
        );
      }}
    </Mutation>
  );
};

const EventsContainer = (props: Props) => {
  const { history: h } = props;
  const today = new Date().toISOString();

  return (
    <Query query={FUTURE_EVENTS} variables={{ date: today }} config={config}>
      {({ loading: loadingEvents, error: eventsError, data: { events } }) => (
        <Query query={LOCAL_USER}>
          {({
            loading: loadingUser,
            error: userError,
            data: { localUser },
          }) => {
            if (loadingEvents || loadingUser) {
              return <span>loading...</span>;
            }
            if (eventsError || userError) {
              return <h1>Error...</h1>;
            }
            const formattedEvents = map(evt => {
              return {
                ...evt,
                location: evt.address,
                name: evt.title,
                eventType: evt.type,
                date: new Date(evt.date),
              };
            }, events);
            const username: string = localUser ? localUser.username : '';
            const eventRenderer = renderEvent(username);
            return <Fragment>{map(eventRenderer, formattedEvents)}</Fragment>;
          }}
        </Query>
      )}
    </Query>
  );
};

export default compose(withRouter)(EventsContainer);
