// @flow

export type FormikBag = {
  values: { [field: string]: string },
  errors: { [field: string]: string },
  touched: { [field: string]: boolean },
  handleBlur: (e: any) => void,
  handleChange: (e: any) => void,
  handleSubmit: (e: any) => void,
  isSubmitting: boolean,
  loading: boolean,
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
};

export type ID = number | string;

export type MenuItem = {
  id: ID,
  title: string,
  link: string,
};
