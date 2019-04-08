// @flow
import React from 'react';
import { Flex, Text } from 'rebass';
import { ErrorMessage, withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, BigInput } from '../../Common';
import { Buttons } from './Common';
import type { FormikBag } from '../../../flow-types';



type vals = {
  name: string,
};

type Props = {
  onNextClick: (name: string) => void,
  ...FormikBag,
  values: {
    ...vals,
  },
  errors: {
    ...vals,
  },
};

const EventNameForm = (props: Props) => {
  const {
    onNextClick,
    handleSubmit,
    values,
    handleBlur,
    handleChange,
    errors,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Text m={4} fontSize={[5, 6, 7]}>
          Tapahtuman nimi
        </Text>
        <BigInput
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />
        <ErrorMessage name="name" />
        <Buttons onNextClick={onNextClick} />
      </Flex>
    </form>
  );
};

const Formik = withFormik({
  mapPropsToValues: () => ({ name: '' }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Anna tapahtuman nimi'),
  }),

  handleSubmit: (values, formikBag) => {
    const { props } = formikBag;
    const { onNextClick } = props;
    onNextClick(values, formikBag);
  },

  displayName: 'EventName',
})(EventNameForm);

export default Formik;
