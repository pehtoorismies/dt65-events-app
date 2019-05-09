// @flow
import React from 'react';
import { Box, Flex, Heading } from 'rebass';
import * as Yup from 'yup';
import { Button, TextLink } from '../../Common';
import FormField from '../FormField';
import type { FormikBag } from '../../../flow-types';

type vals = {
  username: string,
  password: string,
};
type Props = {
  ...FormikBag,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
  onForgotPasswordClick: () => void,
};

const PlainLoginForm = (props: Props) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    loading,
    isSubmitting,
    onForgotPasswordClick,
  } = props;

  return (
    <Box>
      <Heading py={3} color="black" textAlign="center" fontWeight={700}>
        LOGIN
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormField
          name="username"
          type="username"
          label="Käyttäjätunnus (ei sähköposti)"
          placeholder="metsäsika65"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
          required
        />

        <FormField
          name="password"
          label="Salasana"
          placeholder="salasanasi"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />
        <Flex justifyContent="center">
          <Button
            m={2}
            primary
            type="submit"
            loading={loading}
            disabled={isSubmitting}
            variant="primary"
          >
            Kirjaudu
          </Button>
        </Flex>
      </form>
      <TextLink onClick={onForgotPasswordClick} m={2} textAlign="center">
        Unohdin salasanani
      </TextLink>
    </Box>
  );
};

export const formikProps = {
  mapPropsToValues: () => {
    return { password: '', username: '' };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('Pakollinen kenttä')
      .email('Tarkista sähköposti'),
    password: Yup.string().required('Pakollinen kenttä'),
  }),

  displayName: 'LoginForm',
};

export default PlainLoginForm;
