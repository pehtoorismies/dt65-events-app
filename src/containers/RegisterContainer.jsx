// @flow
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import RegisterCmp from '../components/Forms/Auth/Register';
import { ROUTES } from '../constants';
import type { FormikBag } from '../flow-types';

const REGISTER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $username: String!
    $registerSecret: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      username: $username
      registerSecret: $registerSecret
    ) {
      id
    }
  }
`;
type Props = {
  history: any,
};

const RegisterContainer = (props: Props) => {
  const { history: h } = props;
  const [formikBag, setFormikBag] = useState({});

  return (
    <Mutation mutation={REGISTER}>
      {(register, { data, loading, error }) => {
        // console.log('data', data);
        // console.log('loading', loading);
        // console.log('error', error);
        if (error) {
          const { message, graphQLErrors, networkError } = error;
          // console.log('message', message);
          // console.log('graphQLErrors', graphQLErrors);
          // console.log('networkError', networkError);
          
          if (formikBag && formikBag.setErrors) {
            formikBag.setErrors({ general: 'Ooops' });
          }
        }

        const handleFormSubmit = (values: any, fb: FormikBag) => {
          setFormikBag(fb);
          register({ variables: values });
        };

        return (
          <RegisterCmp
            handleFormSubmit={handleFormSubmit}
            onLoginClick={() => h.push(ROUTES.login)}
          />
        );
      }}
    </Mutation>
  );
};
export default withRouter(RegisterContainer);
