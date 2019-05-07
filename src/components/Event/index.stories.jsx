// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withFormik } from 'formik';
import faker from 'faker';
import { times } from 'ramda';
import EventTypeSelector from './Creator/EventTypeSelector';
import EventDateSelector from './Creator/EventDateSelector';
import PlainCreatorForm, { formikProps as createProps } from './Creator';
import EventBox from './EventBox';
import HeadCountButton from './HeadCountButton';
import { EVENT_TYPES } from '../../constants';

const createUser = id => {
  return {
    id,
    username: faker.internet.userName(),
  };
};

const numParticipants = faker.random.number(20);

const createFormikProps = {
  ...createProps,
  handleSubmit: action('Submit'),
};

const Creator = withFormik(createFormikProps)(PlainCreatorForm);

const event = {
  id: 1,
  title: 'Raatojuoksu',
  subtitle: 'Tarkenne',
  date: new Date(),
  race: true,
  time: '10:00',
  type: {
    title: 'Juoksu',
    type: 'running',
  },
  participants: times(createUser, numParticipants),
  location: 'Raappavuori',
};

const common = {
  loading: false,
  onParticipateClick: action('Part'),
  onShowEventClick: action('Show event'),
  fullyOpen: false,
};

const idx = faker.random.number(numParticipants - 1);

storiesOf('Event/Listing', module)
  .add('box not participating', () => (
    <EventBox username="someUser" event={event} {...common} />
  ))
  .add('box is participating', () => (
    <EventBox
      username={event.participants[idx].username}
      event={event}
      {...common}
    />
  ))
  .add('box is participating - fully open', () => (
    <EventBox
      username={event.participants[idx].username}
      event={event}
      {...common}
      fullyOpen
    />
  ))
  .add('count', () => (
    <HeadCountButton
      disabled={false}
      highlighted={false}
      count={99}
      onClick={action('Click')}
    />
  ))
  .add('count - highlited', () => (
    <HeadCountButton
      disabled={false}
      highlighted
      count={99}
      onClick={action('Click')}
    />
  ))
  .add('count - disabled', () => (
    <HeadCountButton
      disabled
      highlighted
      count={99}
      onClick={action('Click')}
    />
  ));

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
