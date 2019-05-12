// @flow
import React from 'react';
import { Flex, Box } from 'rebass';
import * as Yup from 'yup';
import { ErrorMessage, withFormik } from 'formik';
import { Button, BigInput } from '../../Common';
import { Title, CustomError } from './Common';
import EventDateSelector from './EventDateSelector';

import type { FormikBag } from '../../../flow-types';

type vals = {
  date: Date,
  time: string,
};

type Props = {
  ...FormikBag,
  // eslint-disable-next-line react/no-unused-prop-types
  handleFormSubmit: (date: Date, time: string) => void,
  onPrevClick: () => void,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
};

const TypeDate = (props: Props) => {
  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    onPrevClick,
    setFieldValue,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Box
        m={2}
        width="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Title my={2} textAlign="center">
            Päivämäärä
          </Title>
        <EventDateSelector
          label="Valitse päivämäärä *"
          onSetDateClick={d => {
            setFieldValue('date', d);
          }}
          preSelected={values.date}
        />
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <ErrorMessage name="date" component={CustomError} />
        </Flex>
        <Box width="100%" m={2}>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Title size={20} my={2} textAlign="center">
              Anna aika
            </Title>
            <BigInput
              size={20}
              name="time"
              value={values.time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.time}
              placeholder="aika esim 10:00"
            />
            <ErrorMessage name="time" component={CustomError} />
          </Flex>
        </Box>

        <Flex justifyContent="center">
          <Button onClick={onPrevClick} type="button" m={2}>
            Vaihda nimi
          </Button>
          <Button type="submit" m={2}>
            Seuraava
          </Button>
        </Flex>
      </Box>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({ date, time }) => ({
    date,
    time,
  }),
  handleSubmit: ({ date, time }, { props: { handleFormSubmit } }) => {
    handleFormSubmit(date, time);
  },
  validationSchema: Yup.object().shape({
    date: Yup.string().required('Anna tapahtuman päivämäärä'),
  }),
  displayName: 'Dates',
})(TypeDate);
