// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { path } from 'ramda';
import { toast } from 'react-toastify';
import Login from '../components/Forms/Auth/Login';
import { ROUTES } from '../constants';
import { API_URL } from '../config';
import { login } from '../util/auth';
import type { FormikBag } from '../flow-types';

const statusPath = path(['response', 'status']);

type Props = {
  history: any,
};

const LoginContainer = (props: Props) => {
  const { history: h } = props;

  const handleFormSubmit = (values: any, formikBag: FormikBag) => {
    const url = `${API_URL}/auth/login`;
    axios
      .post(url, values)
      .then(({ data }) => {
        login(data.token);
        h.push(ROUTES.home);
      })
      .catch(error => {
        const status = statusPath(error);
        if (status === 401) {
          formikBag.setFieldError(
            'username',
            'Käyttäjätunnus tai salasana väärin'
          );
          formikBag.setFieldError(
            'password',
            'Käyttäjätunnus tai salasana väärin'
          );
        } else {
          console.error(error);
          toast.error('Palvelussa vikaa, kokeile kohta uudelleen', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .finally(() => {
        formikBag.setSubmitting(false);
      });
  };

  return (
    <Login
      handleFormSubmit={handleFormSubmit}
      onForgotPasswordClick={() => h.push(ROUTES.forgotPassword)}
    />
  );
};

export default withRouter(LoginContainer);
