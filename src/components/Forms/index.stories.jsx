import React from 'react';
import { storiesOf } from '@storybook/react';

import FormField from './FormField';
import { Login, ForgotPassword } from './Auth';

storiesOf('Forms', module).add('form field', () => (
  <FormField label="Label" error="This is error" />
));
storiesOf('Forms/Auth', module).add('login', () => (
  <Login  />
)).add('forgot password', () => (
  <ForgotPassword />
));
