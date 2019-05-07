// @flow
import React, { Fragment } from 'react';
import { compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { path } from 'ramda';
import { renderEvent, formatEvent } from './Common';

import { LOCAL_USER, CURRENT_EVENT } from './queries';

const getId = path(['match', 'params', 'id']);

const config = {
  name: 'getEvent',
};

type Props = {
  history: any,
};

const EventContainer = (props: Props) => {
  const { history: h } = props;
  const eventId = getId(props);

  return (
    <Query query={CURRENT_EVENT} variables={{ id: eventId }} config={config}>
      {({ loading: loadingEvents, error: eventsError, data: { event } }) => (
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

            const formattedEvent = formatEvent(event);

            const username: string = localUser ? localUser.username : '';
            const eventRenderer = renderEvent(username);
            return <Fragment>{eventRenderer(formattedEvent)}</Fragment>;
          }}
        </Query>
      )}
    </Query>
  );
};

export default compose(withRouter)(EventContainer);
