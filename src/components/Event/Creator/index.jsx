// @flow
import React from 'react';
import { Flex, Box, Text } from 'rebass';
import { ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Title } from './Common';
import { BigInput, Button } from '../../Common';
import EventTypeSelector from './EventTypeSelector';
import EventDateSelector from './EventDateSelector';
import { EVENT_TYPES } from '../../../constants';

import type { EventCategory, FormikBag } from '../../../flow-types';

type vals = {
  name: string,
  time: string,
  address: string,
  date: string,
  type: EventCategory,
};

type Props = {
  ...FormikBag,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmit: (values: vals, formikBag: FormikBag) => void,
  onCancel: () => void,
};

// eslint-disable-next-line react/prop-types
const CustomError = ({ children }) => {
  return (
    <Text color="red" fontWeight="bold">
      {children}
    </Text>
  );
};

const Creator = (props: Props) => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    onCancel,
  } = props;

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContert="space-between"
      width="100%"
    >
      <Title>Luo tapahtuma</Title>
      <form onSubmit={handleSubmit}>
        <Box m={2} width="100%">
          <EventTypeSelector
            preSelected={values.type}
            onEventClick={category => {
              setFieldValue('type', category);
            }}
            eventTypes={EVENT_TYPES}
          />
          <Flex m={2} justifyContent="center">
            <ErrorMessage name="type" component={CustomError} />
          </Flex>
        </Box>
        <Box width="100%" m={2}>
          <Text color="darkgrey" ml={2}>
            nimi
          </Text>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <BigInput
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              placeholder="Nimi"
            />
            <ErrorMessage name="name" component={CustomError} />
          </Flex>
        </Box>
        <Box
          m={2}
          width="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="darkgrey" ml={2}>
            päivämäärä
          </Text>
          <EventDateSelector
            onSetDateClick={date => {
              setFieldValue('date', date);
            }}
            preSelected={values.date}
          />
          <Flex m={2} justifyContent="center">
            <ErrorMessage name="date" component={CustomError} />
          </Flex>
        </Box>
        <Box width="100%" m={2}>
          <Text color="darkgrey" ml={2}>
            nimi
          </Text>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <BigInput
              name="time"
              value={values.time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              placeholder="Aika"
            />
            <ErrorMessage name="time" component={CustomError} />
          </Flex>
        </Box>
        <Box width="100%" m={2}>
          <Text color="darkgrey" ml={2}>
            osoite/paikka
          </Text>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <BigInput
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address}
              placeholder="Osoite/paikka"
            />
            <ErrorMessage name="address" component={CustomError} />
          </Flex>
        </Box>
        <Flex width="100%">
          <Button onClick={onCancel} m={2} width={200} type="button">
            Peruuta
          </Button>
          <Button
            m={2}
            width={200}
            type="submit"
            variant="primary"
            justifyContent="center"
          >
            Luo
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

const Formik = withFormik({
  mapPropsToValues: () => ({ name: '', date: '', time: '', type: '' }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Anna tapahtuman nimi'),
    date: Yup.string().required('Anna päivämäärä'),
    type: Yup.string().required('Anna tapahtuman aika'),
  }),

  handleSubmit: (values, formikBag) => {
    const { props } = formikBag;
    const { onSubmit } = props;
    onSubmit(values, formikBag);
  },

  displayName: 'Creator',
})(Creator);

export default Formik;
