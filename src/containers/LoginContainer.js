// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import type { history } from 'react-router-dom';
import Login from '../components/Forms/Auth/Login';
import { ROUTES } from '../constants';

type Props = {
  history: history,
};

const LoginContainer = (props: Props) => {
  const { history: h } = props;
  return <Login onForgotPasswordClick={() => h.push(ROUTES.forgotPassword)} />;
};

export default withRouter(LoginContainer);
