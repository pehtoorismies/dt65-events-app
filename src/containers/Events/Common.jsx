// @flow
import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { find, propEq } from 'ramda';
import EventBox from '../../components/Event/EventBox';
import { isParticipating } from '../../util';
import { JOIN_EVENT, UNJOIN_EVENT } from './queries';
import { EVENT_TYPES } from '../../constants';
import type { Event, ID } from '../../flow-types';

const renderEvent = (
  username: string,
  onShowEventClick: any,
  fullyOpen: boolean = false,
  onDeleteEvent?: (id: ID) => Promise<void>
) => (evt: Event) => {
  const { id } = evt;
  const joined = isParticipating(username, evt.participants);

  return (
    <Mutation key={id} mutation={JOIN_EVENT}>
      {(joinEvent, { loading: joinLoading, error: joinError }) => {
        return (
          <Mutation mutation={UNJOIN_EVENT}>
            {(unjoinEvent, { loading: unjoinLoading, error: unjoinError }) => {
              const action = joined ? unjoinEvent : joinEvent;
              if (unjoinError || joinError) {
                console.error(unjoinError || joinError);
                toast.error(`Ilmoittautumisessa ongelmia...`, {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: false,
                });
              }

              return (
                <EventBox
                  onDeleteEventClick={onDeleteEvent}
                  fullyOpen={fullyOpen}
                  onShowEventClick={onShowEventClick}
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

const findType = (type, allTypes) => {
  const eventType = find(propEq('type', type.toLowerCase()))(allTypes);
  if (eventType) {
    return eventType;
  }
  return 'not defined';
};

const formatEvent = (evt: any) => ({
  ...evt,
  location: evt.address,
  name: evt.title,
  type: findType(evt.type.toLowerCase(), EVENT_TYPES),
  date: new Date(evt.date),
});

export { renderEvent, formatEvent };
