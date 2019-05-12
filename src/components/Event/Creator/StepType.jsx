// @flow
import React from 'react';
import { Box, Flex, Text } from 'rebass';
import { ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Switch from 'react-switch';
import EventTypeSelector from './EventTypeSelector';
import { EVENT_TYPES } from '../../../constants';
import { colors } from '../../../util/themeAx';
import { Title, CustomError } from './Common';
import { Button } from '../../Common';

import type { EventCategory, FormikBag } from '../../../flow-types';

type vals = {
  type: EventCategory,
  race: boolean,
};

type Props = {
  ...FormikBag,
  // eslint-disable-next-line react/no-unused-prop-types
  handleFormSubmit: (type: string, race: boolean) => void,
  onPrevClick: () => void,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
};

const Divider = styled.div`
  border-top: 1px solid ${colors('lightestgrey')};
  margin-bottom: 8px;
  width: 90%;
  text-align: center;
  margin: 0 auto 8px auto;
`;

const TypeStep = (props: Props) => {
  const { handleSubmit, values, setFieldValue } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Flex alignItems="center" flexDirection="column">
          <Title textAlign="center" fontWeight="bold" m={4}>
            Luo tapahtuma
          </Title>
          <Title my={2} textAlign="center">
            Valitse laji
          </Title>
          <ErrorMessage name="type" component={CustomError} />
          <Divider />
          <EventTypeSelector
            preSelected={values.type}
            onEventClick={category => {
              setFieldValue('type', category);
            }}
            eventTypes={EVENT_TYPES}
          />
        </Flex>

        <label>
          <Text textAlign="center" fontWeight="bold" m={4}>
            Kilpailu?
          </Text>
          <Flex justifyContent="center">
            <Switch
              onChange={val => {
                setFieldValue('race', val);
              }}
              checked={values.race}
            />
          </Flex>
        </label>
        <Flex justifyContent="center">
          <Button my={4} type="submit">
            Seuraava
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({ type, race }) => ({
    type,
    race,
  }),
  handleSubmit: ({ type, race }, { props: { handleFormSubmit } }) => {
    handleFormSubmit(type, race);
  },
  validationSchema: Yup.object().shape({
    type: Yup.string().required('Valitse laji / tyyppi'),
  }),
  displayName: 'Type',
})(TypeStep);
