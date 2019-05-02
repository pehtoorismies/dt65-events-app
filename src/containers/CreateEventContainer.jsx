// @flow
import React from 'react';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import styled from 'styled-components';
import Creator, { formikProps } from '../components/Event/Creator';

type Props = {};

// id: ID!
// title: String!
// date: DateTime!
// time: String
// address: String
// description: String
// race: Boolean!
// type: EventType!

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!
    $date: DateTime!
    $time: String
    $race: Boolean
    $type: EventType!
    $address: String
  ) {
    createEvent(
      title: $title
      date: $date
      time: $time
      race: $race
      address: $address
    ) {
      accessToken
      idToken
      expiresIn
    }
  }
`;

const CreateEventContainer = (props: Props) => {
  const {
    history: { push },
  } = props;
  return <Creator {...props} />;
};

const config = {
  name: 'createEventMutation',
};

const createEventProps = {
  ...formikProps,
  handleSubmit: async (values, props) => {
    console.log('props', props);
    const {
      setErrors,
      setSubmitting,
      props: {  history, createEventMutation },
    } = props;

    try {
      const event = await createEventMutation({
        variables: values,
      });
      // const { idToken, accessToken, expiresIn } = authUser.data.login;
      // login(idToken, accessToken, expiresIn);
      // history.push('/');
    } catch (error) {
      console.error(error);
      // const errors = parseErrors(error);
      // setErrors(errors);
    } finally {
      setSubmitting(false);
    }
  },
};

export default compose(
  withRouter,
  graphql(CREATE_EVENT, config),
  withFormik(createEventProps)
)(CreateEventContainer);
