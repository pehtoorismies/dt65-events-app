import React from 'react';
import { withFormik} from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FormField from './FormField';
import { ForgotPassword } from './Auth';
import PlainRegisterForm, { formikProps as regProps } from './Auth/Register';
import PlainLoginForm, { formikProps as logProps } from './Auth/Login';

const registerProps = {
  ...regProps,
  handleSubmit: action('Submit')
}

const loginProps = {
  ...logProps,
  handleSubmit: action('Submit')
}

const Register = withFormik(registerProps)(PlainRegisterForm);
const Login = withFormik(loginProps)(PlainLoginForm);

storiesOf('Forms', module).add('form field', () => (
  <FormField label="Label" error="This is error" />
));
storiesOf('Forms/Auth', module)
.add('register', () => (
  <Register
    handleFormSubmit={action('Submit')}
    onForgotPasswordClick={action('Click')}
  />
))
  .add('login', () => (
    <Login
      handleFormSubmit={action('Submit')}
      onForgotPasswordClick={action('Click')}
    />
  ))
  .add('forgot password', () => <ForgotPassword />);
