// @flow
import React from 'react';
import { Flex, Box, Text } from 'rebass';
import { ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Title } from './Common';
import { BigInput, Button } from '../../Common';
import EventTypeSelector from './EventTypeSelector';
import EventDateSelector from './EventDateSelector';
import { EVENT_TYPES } from '../../../constants';
import { colors } from '../../../util/themeAx';

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

const Divider = styled.div`
  border-top: 1px solid ${colors('lightgray')};
  margin-bottom: 8px;
`;

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
    >
      <Title>Luo tapahtuma</Title>
      <form onSubmit={handleSubmit}>
        <Box>
          <Text m={2} color="darkgrey">
            tyyppi
          </Text>
          <Divider />
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
          <Divider />
          <Text color="darkgrey" m={2}>
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
              placeholder="anna nimi"
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
          <Divider />
          <Text color="darkgrey" m={2}>
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
          <Text color="darkgrey" m={2}>
            aika
          </Text>
          <Divider />
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
              placeholder="aika 10:00.."
            />
            <ErrorMessage name="time" component={CustomError} />
          </Flex>
        </Box>
        <Box width="100%" m={2}>
          <Text color="darkgrey" m={2}>
            osoite/paikka
          </Text>
          <Divider />
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
              placeholder="osoite / paikka"
            />
            <ErrorMessage name="address" component={CustomError} />
          </Flex>
        </Box>
  
        <Flex mt={4} justifyContent="center" flexWrap="wrap">
        
          <Button onClick={onCancel} m={2} width={130} type="button">
            Peruuta
          </Button>
          <Button
            m={2}
            width={130}
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
    type: Yup.string().required('Valitse tapahtuman tyyppi'),
  }),

  handleSubmit: (values, formikBag) => {
    const { props } = formikBag;
    const { onSubmit } = props;
    onSubmit(values, formikBag);
  },

  displayName: 'Creator',
})(Creator);

export default Formik;
