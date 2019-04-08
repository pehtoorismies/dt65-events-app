// @flow
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line
import { EventName, EventType } from './Creator';

const clickProps = {
  onNextClick: action('Next'),
  onPreviousClick: action('Prev'),
};

const events = [
  {
    type: 'cycling',
    title: 'Pyöräily',
  },
  {
    type: 'running',
    title: 'Juoksu',
  },
];

storiesOf('Event/Creator', module)
  .add('type', () => (
    <EventType onEventClick={action('Event Type')} events={events} preSelected="cycling" />
  ))
  .add('name', () => <EventName {...clickProps} />);
