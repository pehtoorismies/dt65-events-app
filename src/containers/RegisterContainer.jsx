// @flow
import React from 'react';
import gql from 'graphql-tag';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterCmp, { formikProps } from '../components/Forms/Auth/Register';
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

const config = {
  name: 'registerMutation',
};

type Props = {
  history: any,
  ...FormikBag,
};

const parseErrors = error => {
  const { graphQLErrors, networkError } = error;

  if (graphQLErrors) {
    const err = graphQLErrors[0];
    if (err.name === 'UserInputError') {
      const { data } = err;
      return data;
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
      props: { registerMutation, history },
    } = props;

    try {
      await registerMutation({
        variables: values,
      });
      toast.info(`Katso sähköpostisi ${values.email} ja seuraa ohjeita`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });

      history.push('/login');
    } catch (error) {
      // const { graphQLErrors, networkError } = error;
      const errors = parseErrors(error);
      setErrors(errors);
    } finally {
      setSubmitting(false);
    }
  },
};

const RegisterContainer = (props: Props) => {
  const {
    history: { push },
  } = props;

  return <RegisterCmp {...props} onLoginClick={() => push(ROUTES.login)} />;
};

export default compose(
  withRouter,
  graphql(REGISTER, config),
  withFormik(registerProps)
)(RegisterContainer);
