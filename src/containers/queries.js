import gql from 'graphql-tag';

Event.fragments = {
  details: gql`
    fragment EventDetails on Event {
      id
      title
      race
      type
      date
      time
      address
    }
  `,
  participants: gql`
    fragment EventParticipants on Event {
      participants {
        username
        id
      }
    }
  `,
};

const CURRENT_EVENT = gql`
  query FetchEvent($id: ID!) {
    event(where: { id: $id }) {
      ...EventDetails
      ...EventParticipants
    }
  }
  ${Event.fragments.details}
  ${Event.fragments.participants}
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(where: { id: $id }) {
      id
    }
  }
`;

const FUTURE_EVENTS = gql`
  query Events($date: DateTime!) {
    events(where: { date_gt: $date }) {
      ...EventDetails
      ...EventParticipants
    }
  }
  ${Event.fragments.details}
  ${Event.fragments.participants}
`;

const LOCAL_USER = gql`
  query LocalUser {
    localUser @client {
      id
      username
    }
  }
`;

const LOGOUT_LOCAL_USER = gql`
  mutation LogoutLocalUser {
    logoutLocalUser @client
  }
`;


const JOIN_EVENT = gql`
  mutation JoinEvent($eventId: ID!, $username: String!) {
    joinEvent(eventId: $eventId, username: $username) {
      id
      ...EventParticipants
    }
  }
  ${Event.fragments.participants}
`;
const UNJOIN_EVENT = gql`
  mutation UnJoinEvent($eventId: ID!, $username: String!) {
    unjoinEvent(eventId: $eventId, username: $username) {
      id
      ...EventParticipants
    }
  }
  ${Event.fragments.participants}
`;

export {
  CURRENT_EVENT,
  LOCAL_USER,
  JOIN_EVENT,
  UNJOIN_EVENT,
  FUTURE_EVENTS,
  DELETE_EVENT,
  LOGOUT_LOCAL_USER,
};
