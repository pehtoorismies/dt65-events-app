// @flow
import React from 'react';
import gql from 'graphql-tag';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { login } from '../util/auth';
import LoginCmp, { formikProps } from '../components/Forms/Auth/Login';
import { ROUTES } from '../constants';
import type { FormikBag } from '../flow-types';

const LOGIN = gql`
  mutation Register($password: String!, $username: String!) {
    login(password: $password, username: $username) {
      accessToken
      idToken
      expiresIn
    }
  }
`;

const config = {
  name: 'loginMutation',
};

type Props = {
  history: any,
  ...FormikBag,
};

const parseErrors = error => {
  const { graphQLErrors, networkError } = error;

  if (graphQLErrors) {
    const err = graphQLErrors[0];
    if (err.name === 'Auth0Error') {
      const errors = {
        username: 'Väärä tunnus tai salasana',
        password: 'Väärä tunnus tai salasana',
      };
      return errors;
    }
  }

  console.log('graphQLErrors', graphQLErrors);
  console.log('networkError', networkError);

  return {
    general: 'General error',
  };
};

const registerProps = {
  ...formikProps,
  handleSubmit: async (values, props) => {
    const {
      setErrors,
      setSubmitting,
      props: { loginMutation, history },
    } = props;

    try {
      const authUser = await loginMutation({
        variables: values,
      });
      const { idToken, accessToken, expiresIn } = authUser.data.login;
      login(idToken, accessToken, expiresIn);
      history.push('/');
    } catch (error) {
      const errors = parseErrors(error);
      setErrors(errors);
    } finally {
      setSubmitting(false);
    }
  },
};

const LoginContainer = (props: Props) => {
  const {
    history: { push },
  } = props;

  return (
    <LoginCmp
      {...props}
      onForgotPasswordClick={() => push(ROUTES.forgotPassword)}
    />
  );
};

export default compose(
  withRouter,
  graphql(LOGIN, config),
  withFormik(registerProps)
)(LoginContainer);
