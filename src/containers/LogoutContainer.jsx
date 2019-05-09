// @flow
import React, { useEffect } from 'react';
import { compose, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOGOUT_LOCAL_USER } from './queries';
import { ROUTES } from '../constants';

type Props = {
  logout: any,
};

const LogoutContainer = (props: Props) => {
  const { logout } = props;

  useEffect(() => {
    try {
      logout();
      toast.info(`Olet kirjautunut ulos`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
      });
    } catch (e) {
      console.error(e);
      toast.error(`Logout epäonnistui`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  });

  return (
    <Redirect
      to={{
        pathname: ROUTES.login,
      }}
    />
  );
};

export default compose(
  graphql(LOGOUT_LOCAL_USER, {
    name: 'logout',
  })
)(LogoutContainer);
