// @flow
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import RegisterCmp from '../components/Forms/Auth/Register';
import { ROUTES } from '../constants';

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

  return (
    <Mutation mutation={REGISTER}>
      {(register, { data, loading, error }) => {
        console.log('data', data);
        console.log('loading', loading);
        console.log('error', error);
        if (error) {
          console.log('error', error.message);
          console.log('error', error.graphQLErrors);
        }

        const handleFormSubmit = (values, formikBag) => {
          register({ variables: { ...values, registerSecret: 'koira' } });
          console.log('Done');
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
