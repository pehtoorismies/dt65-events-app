// @flow
import React, { Fragment } from 'react';
import { compose, Query, graphql } from 'react-apollo';
import { withRouter, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { path } from 'ramda';
import { renderEvent, formatEvent } from './Common';

import { LOCAL_USER, CURRENT_EVENT, DELETE_EVENT } from './queries';
import { ROUTES } from '../../constants';

const getId = path(['match', 'params', 'id']);

const config = {
  name: 'getEvent',
};

type Props = {
  history: any,
  deleteEventMutation: any,
};

const EventContainer = (props: Props) => {
  const { history: h, deleteEventMutation } = props;
  const eventId = getId(props);

  const onShowClickEvent = () => {};
  const onDeleteEvent = async id => {
    try {
      await deleteEventMutation({
        variables: { id },
      });
      h.push(ROUTES.home);
    } catch (error) {
      console.error(error);
      toast.error(`Poistaminen epäonnistui`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };

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
            if (!event) {
              return (
                <Redirect
                  to={{
                    pathname: ROUTES.notFound,
                  }}
                />
              );
            }

            const formattedEvent = formatEvent(event);

            const username: string = localUser ? localUser.username : '';
            const eventRenderer = renderEvent(
              username,
              onShowClickEvent,
              true,
              onDeleteEvent
            );
            return <Fragment>{eventRenderer(formattedEvent)}</Fragment>;
          }}
        </Query>
      )}
    </Query>
  );
};

export default compose(
  withRouter,
  graphql(DELETE_EVENT, {
    name: 'deleteEventMutation',
  })
)(EventContainer);
