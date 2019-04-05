import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from './index';

storiesOf('Button', module)
  .add('primary', () => (
    <Button variant="primary" onClick={action('clicked')}>
      Hello Button
    </Button>
  ))
  .add('outline', () => (
    <Button variant="outline" onClick={action('clicked')}>
      Hello Button
    </Button>
  ));
