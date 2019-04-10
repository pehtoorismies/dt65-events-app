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
  email: string,
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
  handleFormSubmit: HandleSubmit,
};

const PlainForgotPasswordForm = (props: Props) => {
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
        UNOHTUNUT SALASANA
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
        <Flex justifyContent="center">
          <Button
            m={2}
            primary
            type="submit"
            loading={loading}
            disabled={isSubmitting}
            variant="primary"
          >
            Lähetä linkki
          </Button>
        </Flex>
      </form>
      <TextLink onClick={onLoginClick} m={2} textAlign="center">
        Kirjatumiseen
      </TextLink>
    </Box>
  );
};

const ForgotPasswordForm = withFormik({
  mapPropsToValues: props => {
    const { email, username } = props;
    return { email, username };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Tarkista muoto')
      .required('Pakollinen kenttä'),
  }),
  handleSubmit: (values, props) => {
    const {
      props: { handleFormSubmit },
    } = props;

    const formigBag: FormikBag = omit(['props'], props);
    handleFormSubmit(values, formigBag);
  },

  displayName: 'ForgotPasswordForm',
})(PlainForgotPasswordForm);

export default ForgotPasswordForm;
