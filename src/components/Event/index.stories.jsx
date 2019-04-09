// @flow
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line
import EventTypeSelector from './Creator/EventTypeSelector';
import EventDateSelector from './Creator/EventDateSelector';
import Creator from './Creator';
import { EVENT_TYPES } from '../../constants';

storiesOf('Event/Creator', module)
  .add('type', () => (
    <EventTypeSelector
      onEventClick={action('Event Type')}
      eventTypes={EVENT_TYPES}
      preSelected="cycling"
    />
  ))
  .add('date', () => (
    <EventDateSelector
      onSetDateClick={action('Date select')}
      preselected={null}
    />
  ))
  .add('wizard', () => (
    <Creator onSubmit={action('Submit')} onCancel={action('Cancel')} />
  ));
