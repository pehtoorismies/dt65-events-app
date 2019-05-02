// @flow
import React from 'react';
import { Box, Flex, Heading, Text } from 'rebass';
import * as Yup from 'yup';
import { Button, TextLink } from '../../Common';
import FormField from '../FormField';
import type { FormikBag } from '../../../flow-types';

type vals = {
  email: string,
  username: string,
  password: string,
  passwordRepeat: string,
  name: string,
  registerSecret: string,
  general: string,
};
type Props = {
  ...FormikBag,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
  onLoginClick: () => void,
};

const PlainRegisterForm = (props: Props) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    loading,
    isSubmitting,
    onLoginClick,
  } = props;

  return (
    <Box>
      <Heading py={3} color="black" textAlign="center" fontWeight={700}>
        REKISTERÖIDY
      </Heading>
      <Text mb={4} textAlign="center">
        Täytä kaikki kentät. Rekisteröintikoodin saat seuralta.
      </Text>
      <Text color="red">{errors.general}</Text>
      <form onSubmit={handleSubmit}>
        <FormField
          name="username"
          label="Käyttäjätunnus, joka näkyy muille käyttäjille"
          placeholder="metsäsika65"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.username}
        />
        <FormField
          name="email"
          label="Sähköpostiosoitteesi"
          placeholder="metsa@kauris.net"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
        <FormField
          name="name"
          label="Nimesi"
          placeholder="Marco de Wit"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
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
        <FormField
          name="passwordRepeat"
          label="Salasana"
          placeholder="salasanasi uudelleen"
          type="password"
          value={values.passwordRepeat}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.passwordRepeat}
        />
        <FormField
          name="registerSecret"
          label="Seuran koodi"
          placeholder="seuran koodi"
          type="password"
          value={values.registerSecret}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.registerSecret}
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
      <TextLink onClick={onLoginClick} m={2} textAlign="center">
        Kirjautumiseen
      </TextLink>
    </Box>
  );
};

const formikProps = {
  mapPropsToValues: () => {
    return {
      email: '',
      username: '',
      name: '',
      password: '',
      passwordRepeat: '',
      registerSecret: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required('Pakollinen kenttä')
      .email('Tarkista sähköpostiosoite'),
    username: Yup.string().required('Pakollinen kenttä'),
    name: Yup.string().required('Pakollinen kenttä'),
    password: Yup.string().required('Pakollinen kenttä'),
    passwordRepeat: Yup.string()
      .required('Pakollinen kenttä')
      .oneOf([Yup.ref('password'), null], 'Salasanojen tulee olla samat'),
    registerSecret: Yup.string().required('Pakollinen kenttä'),
  }),
  displayName: 'RegisterForm',
}


export { formikProps };

export default PlainRegisterForm;
