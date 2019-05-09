// @flow
import React, { useState } from 'react';
import { compose, Query, graphql } from 'react-apollo';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { path } from 'ramda';
import Popup from '../../components/Popup';
import { renderEvent, formatEvent } from './Common';

import { LOCAL_USER, CURRENT_EVENT, DELETE_EVENT } from '../queries';
import { ROUTES } from '../../constants';

const getId = path(['match', 'params', 'id']);

const config = {
  name: 'getEvent',
};

const Wrapper = styled.div`
  position: relative;
`;

type Props = {
  history: any,
  deleteEventMutation: any,
};

const EventContainer = (props: Props) => {
  const { history: h, deleteEventMutation } = props;
  const [popupVisible, setPopupVisible] = useState(false);
  const eventId = getId(props);

  const onOkClick = async () => {
    try {
      await deleteEventMutation({
        variables: { id: eventId },
      });
      setPopupVisible(false);
      h.push(ROUTES.home);
      toast.info(`Poistaminen onnistui`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error(error);
      toast.error(`Poistaminen epäonnistui`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };
  const onDeleteEvent = () => {
    setPopupVisible(true);
  };
  const onShowClickEvent = () => {};

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

            return (
              <Wrapper>
                <Popup
                  showModal={popupVisible}
                  onCancelClick={() => setPopupVisible(false)}
                  onOkClick={onOkClick}
                />
                {eventRenderer(formattedEvent)}
              </Wrapper>
            );
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
