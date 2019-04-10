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
  setSubmitting: (value: boolean) => void,
  setFieldError: (field: string, value: string) => void,
};

export type ID = number | string;

export type MenuItem = {
  id: ID,
  title: string,
};

export type EventCategory = "running" | "cycling" | "orienteering";

export type EventType = {
  type: EventCategory,
  title: string,
};

export type Event = {
  name: string,
  id: ID,
  race: boolean,
  time: string,
  date: Date,

}

export type EventCatergoryClick = (type: EventCategory) => void;

export type HandleSubmit = (values: any, formikBag: FormikBag) => void;