import React from 'react';
import { storiesOf } from '@storybook/react';


import FormField  from './FormField';

storiesOf('Forms', module)
  .add('form field', () => (
    <FormField variant="primary" onClick={action('clicked')}>
      Hello Button
    </FormField>
  ))
  