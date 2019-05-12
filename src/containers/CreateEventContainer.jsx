// @flow
import React from 'react';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, graphql, Mutation } from 'react-apollo';
import Creator from '../components/Event/Creator';
import { ROUTES } from '../constants';

type Props = {
  history: any,
};

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $date: DateTime!
    $time: String
    $subtitle: String
    $race: Boolean
    $type: EventType!
    $address: String
    $description: String
  ) {
    createEvent(
      data: {
        title: $title
        date: $date
        time: $time
        race: $race
        type: $type
        subtitle: $subtitle
        address: $address
        description: $description
      }
    ) {
      id
    }
  }
`;

const CreateEventContainer = (props: Props) => {
  const {
    history: { push },
  } = props;

  return (
    <Mutation mutation={CREATE_EVENT}>
      {(createEvent, { loading, error, data }) => {
        if (data) {
          toast.info('Tapahtuma luotu');
          const { id } = data.createEvent;
          return (
            <Redirect
              to={{
                pathname: `${ROUTES.events}/${id}`,
              }}
            />
          );
        }
        if (loading) {
          return <h1>loading</h1>;
        }
        if (error) {
          console.error(error);
        }
        return (
          <Creator
            onSubmit={values => {
              createEvent({ variables: values });
            }}
            onCancel={() => push(ROUTES.home)}
            {...props}
          />
        );
      }}
    </Mutation>
  );
};

const config = {
  name: 'createEventMutation',
};

export default compose(
  withRouter,
  graphql(CREATE_EVENT, config)
)(CreateEventContainer);
