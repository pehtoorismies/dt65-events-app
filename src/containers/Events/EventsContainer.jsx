// @flow
import React, { Fragment } from 'react';
import { compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { map } from 'ramda';
import { LOCAL_USER, FUTURE_EVENTS } from './queries';
import { renderEvent, formatEvent } from './Common';

const config = {
  name: 'allFutureEvents',
};

type Props = {
  history: any,
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
            const formattedEvents = map(formatEvent, events);
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
