// @flow
import React from 'react';
import { Flex, Box } from 'rebass';
import { ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { BigInput, Button } from '../../Common';
import { Title, CustomError } from './Common';

import type { FormikBag } from '../../../flow-types';

type vals = {
  title: string,
  subtitle: string,
};

type Props = {
  ...FormikBag,
  // eslint-disable-next-line react/no-unused-prop-types
  handleFormSubmit: (title: string, subtitle?: string) => void,
  onPrevClick: () => void,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
};


const TypeTitle = (props: Props) => {
  const {
    handleSubmit,
    values,
    errors,
    handleBlur,
    handleChange,
    onPrevClick,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Box width="100%" m={2}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Title my={2} textAlign="center">
            Anna tapahtuman nimi*
          </Title>
          <BigInput
            size={25}
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.title}
            placeholder="anna tapahtuman nimi *"
          />
          <ErrorMessage name="title" component={CustomError} />
        </Flex>
      </Box>
      <Box width="100%" m={2}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Title my={2} textAlign="center">
            Anna tarkenne
          </Title>
          <BigInput
            size={20}
            name="subtitle"
            value={values.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.subtitle}
            placeholder="tarkenne"
          />
          <ErrorMessage name="subtitle" component={CustomError} />
        </Flex>
      </Box>
      <Flex justifyContent="center">
        <Button onClick={onPrevClick} type="button" m={2}>
          Vaihda tyyppi
        </Button>
        <Button type="submit" m={2}>
          Seuraava
        </Button>
      </Flex>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: ({ title, subtitle }) => ({
    title,
    subtitle,
  }),
  handleSubmit: ({ title, subtitle }, { props: { handleFormSubmit } }) => {
    handleFormSubmit(title, subtitle);
  },
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Anna tapahtuman nimi'),
  }),
  displayName: 'Creator',
})(TypeTitle);
