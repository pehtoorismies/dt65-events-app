// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Alert from './index';

storiesOf('Alert', module).add('basic ', () => (
  <Alert onOkClick={action('Ok')} onCancelClick={action('cancel')}>
    <h1>Content</h1>
  </Alert>
));
