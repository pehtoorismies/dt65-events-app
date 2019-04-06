import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, Input, ErrorText } from './index';

storiesOf('Common/Button', module)
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
storiesOf('Common/Text', module).add('ErrorText', () => (
  <ErrorText>This is error</ErrorText>
));
storiesOf('Common/Input', module).add('value', () => (
  <Input value="Moi"></Input>
)).add('placeholder', () => (
  <Input value="" placeholder="This is placeholder"></Input>
)).add('password', () => (
  <Input value="sadfasfd" type="password" ></Input>
));
