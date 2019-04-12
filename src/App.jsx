import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Box } from 'rebass';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './GlobalStyle';
import theme from './theme';
import MenuListContainer from './containers/MenuListContainer';
import LoginContainer from './containers/LoginContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import EventsContainer from './containers/EventsContainer';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from './constants';



const Profile = () => {
  return <div>Profile</div>;
};


const App = () => (
  <Fragment>
    
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <MenuListContainer />
        <ToastContainer />
        <Box >
          <Route exact path={ROUTES.login} component={LoginContainer} />
          <Route exact path={ROUTES.forgotPassword} component={ForgotPasswordContainer} />
          <PrivateRoute exact path={ROUTES.home} component={EventsContainer} />
          <PrivateRoute exact path={ROUTES.profile} component={Profile} />
        </Box>
      </Router>
    </ThemeProvider>
  </Fragment>
);

export default App;
