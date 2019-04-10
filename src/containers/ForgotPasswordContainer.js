// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import ForgotPassword from '../components/Forms/Auth/ForgotPassword';
import { ROUTES } from '../constants';

type Props = {
  history: any,
};

const ForgotPasswordContainer = (props: Props) => {
  const { history: h } = props;
  return <ForgotPassword onLoginClick={() => h.push(ROUTES.login)} />;
};

export default withRouter(ForgotPasswordContainer);
