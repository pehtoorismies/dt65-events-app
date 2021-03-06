import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from 'rebass';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from 'react-apollo';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './GlobalStyle';
import theme from './theme';
import MenuListContainer from './containers/MenuListContainer';
import LoginContainer from './containers/LoginContainer';
import LogoutContainer from './containers/LogoutContainer';
import RegisterContainer from './containers/RegisterContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import EventsContainer from './containers/Events/EventsContainer';
import EventContainer from './containers/Events/EventContainer';
import CreateEventContainer from './containers/CreateEventContainer';
import NotFoundContainer from './containers/NotFoundContainer';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from './constants';
import client from './util/apolloClient';

const Profile = () => {
  return <div>Profile</div>;
};

const App = () => (
  <Fragment>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <MenuListContainer />
          <ToastContainer />
          <Box>
            <Switch>
              <Route exact path={ROUTES.login} component={LoginContainer} />
              <Route exact path={ROUTES.logout} component={LogoutContainer} />
              <Route
                exact
                path={ROUTES.forgotPassword}
                component={ForgotPasswordContainer}
              />
              <Route
                exact
                path={ROUTES.register}
                component={RegisterContainer}
              />
              <PrivateRoute path={ROUTES.event} component={EventContainer} />
              <PrivateRoute
                exact
                path={ROUTES.home}
                component={EventsContainer}
              />

              <PrivateRoute exact path={ROUTES.profile} component={Profile} />
              <PrivateRoute
                exact
                path={ROUTES.createEvent}
                component={CreateEventContainer}
              />
              <Route component={NotFoundContainer} />
            </Switch>
          </Box>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  </Fragment>
);

export default App;
