// @flow
import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { action } from '@storybook/addon-actions'; // eslint-disable-line
import EventTypeSelector from './Creator/EventTypeSelector';
import EventDateSelector from './Creator/EventDateSelector';
import Creator from './Creator';
import EventBox from './EventBox';
import HeadCountButton from './HeadCountButton';
import { EVENT_TYPES } from '../../constants';

const event = {
  id: 1,
  name: 'Raatojuoksu',
  date: new Date(),
  race: true,
  time: '10:00',
  participants: [
    { username: 'koira', id: 1 },
    { username: 'kissa', id: 2 },
    { username: 'heppa', id: 3 },
    { username: 'koira', id: 4 },
    { username: 'kissa', id: 5 },
    { username: 'heppa', id: 6 },
    { username: 'koira', id: 7 },
    { username: 'kissa', id: 8 },
    { username: 'heppa', id: 9 },
  ],
  location: 'Raappavuori'
};

storiesOf('Event/Listing', module)
  .add('box', () => <EventBox event={event} />)
  .add('count', () => <HeadCountButton count={99} onClick={action('Click')} />);

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
