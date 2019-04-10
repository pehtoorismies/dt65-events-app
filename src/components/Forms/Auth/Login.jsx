// @flow
import React from 'react';
import { Box, Flex, Heading } from 'rebass';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { omit } from 'ramda';
import { Button, TextLink } from '../../Common';
import FormField from '../FormField';
import type { FormikBag, HandleSubmit } from '../../../flow-types';

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
  handleFormSubmit: HandleSubmit,
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
        KIRJAUDU
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormField
          name="username"
          type="username"
          label="Köyttäjätunnus (ei sähköposti)"
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

const LoginForm = withFormik({
  mapPropsToValues: props => {
    const { email, username } = props;
    return { email, username };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Pakollinen kenttä'),
    password: Yup.string().required('Pakollinen kenttä'),
  }),
  handleSubmit: (values, props) => {
    const {
      props: { handleFormSubmit },
    } = props;

    const formigBag: FormikBag = omit(['props'], props);
    handleFormSubmit(values, formigBag);
  },

  displayName: 'LoginForm',
})(PlainLoginForm);

export default LoginForm;
