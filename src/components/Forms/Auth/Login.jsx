// @flow
import React from 'react';
import { Box, Flex, Heading } from 'rebass';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { omit } from 'ramda';
import { Button, TextLink } from '../../Common';
import FormField from '../FormField';
import type { FormikBag } from '../../../flow-types';

type vals = {
  email: string,
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
  } = props;

  return (
    <Box>
      <Heading py={3} color="black" textAlign="center">
        Kirjaudu
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormField
          name="email"
          type="email"
          label="Sähköposti"
          placeholder="user@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
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
      <TextLink m={2} textAlign="center">Unohdin salasanani</TextLink>
    </Box>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: props => {
    const { email, username } = props;
    return { email, username };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Tarkista muoto')
      .required('Pakollinen kenttä'),
    password: Yup.string().required('Pakollinen kenttä'),

  }),
  handleSubmit: (values, props) => {
    const {
      props: { handleSubmit },
    } = props;

    const formigBag: FormikBag = omit(['props'], props);
    handleSubmit(values, formigBag);
  },

  displayName: 'LoginForm',
})(PlainLoginForm);

export default LoginForm;
