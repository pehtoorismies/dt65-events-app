// @flow
import React, { Fragment } from 'react';
import { compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { map } from 'ramda';
import { Flex } from 'rebass';
import { isEmptyArray } from 'ramda-adjunct';
import { LOCAL_USER, FUTURE_EVENTS } from '../queries';
import { renderEvent, formatEvent } from './Common';
import { ROUTES } from '../../constants';

const config = {
  name: 'allFutureEvents',
};

type Props = {
  history: any,
};

const EventsContainer = (props: Props) => {
  const { history: h } = props;
  const today = new Date().toISOString();

  const onShowClickEvent = id => h.push(`${ROUTES.events}/${id}`);

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
            if (isEmptyArray(events)) {
              return <h1>no stuff</h1>;
            }

            const formattedEvents = map(formatEvent, events);
            const username: string = localUser ? localUser.username : '';
            const eventRenderer = renderEvent(
              username,
              onShowClickEvent,
              false
            );
            return (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {map(eventRenderer, formattedEvents)}
              </Flex>
            );
          }}
        </Query>
      )}
    </Query>
  );
};

export default compose(withRouter)(EventsContainer);
