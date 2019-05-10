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
import EditButtons from './EditButtons';
import PreviewButtons from './PreviewButtons';
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
    type: 'Running',
    img: 'running',
  },
  participants: times(createUser, numParticipants),
  location: 'Raappavuori',
};

const common = {
  loading: false,
  onParticipateClick: action('Part'),
  onShowEventClick: action('Show event'),
  onCancelClick: action('Cancel'),
  onCreateEventClick: action('Create'),
  onEditEventClick: action('Edit'),
  onDeleteEventClick: action('Delete'),
  fullyOpen: false,
  preview: false,
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
  .add('box is participating - fully open / preview', () => (
    <EventBox
      username={event.participants[idx].username}
      event={event}
      {...common}
      fullyOpen
      preview
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

const editButtonProps = {
  fullyOpen: true,
  setShowDetails: action('Show details'),
  showDetails: true,
  onDeleteClick: action('Delete'),
  onEditClick: action('Edit'),
};

storiesOf('Event/Buttons', module)
  .add('Edit fully open', () => <EditButtons {...editButtonProps} />)
  .add('Edit ', () => (
    <EditButtons {...editButtonProps} fullyOpen={false} showDetails={false} />
  ))
  .add('Previev ', () => (
    <PreviewButtons onCreateClick={action('Create')} onCancelClick={action('Cancel')} />
  ));

storiesOf('Event/Creator', module)
  .add('type', () => (
    <EventTypeSelector
      onEventClick={action('Event Type')}
      eventTypes={EVENT_TYPES}
      preSelected="Cycling"
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
